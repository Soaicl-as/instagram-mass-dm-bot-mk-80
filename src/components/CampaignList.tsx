import { Play, Pause, Trash } from 'lucide-react';
import { useStore } from '../store/useStore';

export function CampaignList() {
  const campaigns = useStore((state) => state.campaigns);
  const updateCampaign = useStore((state) => state.updateCampaign);
  const deleteCampaign = useStore((state) => state.deleteCampaign);

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="bg-white shadow rounded-lg p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{campaign.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateCampaign(campaign.id, {
                    status: campaign.status === 'active' ? 'paused' : 'active',
                  })
                }
                className={`p-2 rounded-full ${
                  campaign.status === 'active'
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                {campaign.status === 'active' ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => deleteCampaign(campaign.id)}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Target Users</h4>
            <div className="mt-1 text-sm text-gray-900">
              {campaign.targetUsers.join(', ')}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Messages</h4>
            <div className="mt-1 space-y-2">
              {campaign.messages.map((message, index) => (
                <div key={message.id} className="text-sm text-gray-900">
                  {index + 1}. {message.content}{' '}
                  <span className="text-gray-500">
                    (Delay: {message.delay}s)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
