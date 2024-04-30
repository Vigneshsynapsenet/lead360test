import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { useFavorites } from '@/favorites/hooks/useFavorites';
import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';
import { RecordShowContainer } from '@/object-record/record-show/components/RecordShowContainer';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { IconBuildingSkyscraper } from '@/ui/display/icon';
import { PageBody } from '@/ui/layout/page/PageBody';
import { PageContainer } from '@/ui/layout/page/PageContainer';
import { PageFavoriteButton } from '@/ui/layout/page/PageFavoriteButton';
import { PageHeader } from '@/ui/layout/page/PageHeader';
import { ShowPageAddButton } from '@/ui/layout/show-page/components/ShowPageAddButton';
import { ShowPageMoreButton } from '@/ui/layout/show-page/components/ShowPageMoreButton';
import { PageTitle } from '@/ui/utilities/page-title/PageTitle';
import { FieldMetadataType } from '~/generated-metadata/graphql';
import { isNonNullable } from '~/utils/isNonNullable';
import { RunCampaignButton } from '@/ui/layout/page/RunCampaignButton';
import { useCampaign } from '~/pages/campaigns/CampaignUseContext';
import { GET_CAMPAIGN_LISTS } from '@/users/graphql/queries/getCampaignList';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_TRIGGER_CAMPAIGN_RECORD } from '@/users/graphql/queries/addTriggerCampaignRecord';
import { UPDATE_CAMPAIGNLIST_STATUS } from '@/users/graphql/queries/updateCampaignlistStatus';
import { UPDATE_LAST_EXECUTION_ID } from '@/users/graphql/queries/updateLastExecutionId';

export const RecordShowPage = () => {
  const { objectNameSingular, objectRecordId } = useParams<{
    objectNameSingular: string;
    objectRecordId: string;
  }>();

  if (!objectNameSingular) {
    throw new Error(`Object name is not defined`);
  }

  if (!objectRecordId) {
    throw new Error(`Record id is not defined`);
  }

  const { labelIdentifierFieldMetadata, objectMetadataItem } =
    useObjectMetadataItem({ objectNameSingular });

  const { favorites, createFavorite, deleteFavorite } = useFavorites();

  const setEntityFields = useSetRecoilState(
    recordStoreFamilyState(objectRecordId),
  );

  const { record, loading } = useFindOneRecord({
    objectRecordId,
    objectNameSingular,
  });

  useEffect(() => {
    if (!record) return;
    setEntityFields(record);
  }, [record, setEntityFields]);

  const correspondingFavorite = favorites.find(
    (favorite) => favorite.recordId === objectRecordId,
  );

  const isFavorite = isNonNullable(correspondingFavorite);

  const handleFavoriteButtonClick = async () => {
    if (!objectNameSingular || !record) return;

    if (isFavorite && record) {
      deleteFavorite(correspondingFavorite.id);
    } else {
      createFavorite(record, objectNameSingular);
    }
  };
  let [selectedCampaign, { data: selectedCampaignData }] =
    useLazyQuery(GET_CAMPAIGN_LISTS);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await selectedCampaign({
          variables: {
            filter: {
              id: { eq: objectRecordId },
            },
          },
        });
        const fetchedCampaigns = data?.data?.campaigns?.edges ?? [];
        setCampaigns(fetchedCampaigns);
        console.log('Fetched campaign:', fetchedCampaigns);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      }
    };

    fetchData();
  }, [objectRecordId, selectedCampaign]);

  const { campaignData, setCampaignData } = useCampaign();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [addTriggerCampaignRecord] = useMutation(ADD_TRIGGER_CAMPAIGN_RECORD);
  const handleRuncampaign = async () => {
    try {
      const { data: addTriggerData } = await addTriggerCampaignRecord({
        variables: {
          input: {
            name: campaigns[0]?.node?.name,
            startDate: campaignData.startDate.toISOString(),
            stopDate: campaignData.endDate.toISOString(),
            status: 'ACTIVE',
            campaignId: campaigns[0]?.node?.id,
          },
        },
      });

      console.log(
        'Response from ADD_TRIGGER_CAMPAIGN_RECORD:',
        addTriggerData.createCampaignTrigger.id,
      );

      let requestBody: {
        campaignId: string;
        queryTimestamp: any;
        campaignTriggerId: any;
        startDate: any;
        stopDate: any;
        id: { selectedID: any } | { unselectedID: any };
      } = {
        campaignId: objectRecordId,
        queryTimestamp: campaignData.querystamp,
        campaignTriggerId: addTriggerData?.createCampaignTrigger?.id,
        startDate: campaignData.startDate,
        stopDate: campaignData.endDate,
        id: { selectedID: campaignData.selectedId },
      };

      if (campaignData.selectedId.length > campaignData.unSelectedId.length) {
        requestBody.id = { unselectedID: campaignData.unSelectedId };
      }

      console.log(requestBody, 'request body');
    } catch (error) {
      console.error('Error fetching campaign:', error);
    }
  };

  const labelIdentifierFieldValue =
    record?.[labelIdentifierFieldMetadata?.name ?? ''];
  const pageName =
    labelIdentifierFieldMetadata?.type === FieldMetadataType.FullName
      ? [
          labelIdentifierFieldValue?.firstName,
          labelIdentifierFieldValue?.lastName,
        ].join(' ')
      : labelIdentifierFieldValue;

  return (
    <PageContainer>
      <PageTitle title={pageName} />
      <PageHeader
        title={pageName ?? ''}
        hasBackButton
        Icon={IconBuildingSkyscraper}
        loading={loading}
      >
        {record && (
          <>
            <PageFavoriteButton
              isFavorite={isFavorite}
              onClick={handleFavoriteButtonClick}
            />
            <ShowPageAddButton
              key="add"
              activityTargetObject={{
                id: record.id,
                targetObjectNameSingular: objectMetadataItem?.nameSingular,
              }}
            />
            <ShowPageMoreButton
              key="more"
              recordId={record.id}
              objectNameSingular={objectNameSingular}
            />
          </>
        )}
        {record && objectNameSingular === 'campaign' && (
          <>
            <RunCampaignButton onClick={handleRuncampaign} />
          </>
        )}
      </PageHeader>
      <PageBody>
        <RecordShowContainer
          objectNameSingular={objectNameSingular}
          objectRecordId={objectRecordId}
        />
      </PageBody>
    </PageContainer>
  );
};
