import { useForm } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Campaign, Message } from '../types';

export function CampaignForm() {
  const { register, handleSubmit, watch } = useForm<Campaign>();
  const addCampaign = useStore((state) => state.addCampaign);

  const onSubmit = (data: Campaign) => {
    addCampaign({
      ...data,
      id: crypto.randomUUID(),
      status: 'paused',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Campaign Name
        </label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Target Users (one per line)
        </label>
        <textarea
          {...register('targetUsers')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Messages</label>
        <div className="mt-1 space-y-2">
          {watch('messages')?.map((_, index) => (
            <div key={index} className="flex gap-2">
              <input
                {...register(`messages.${index}.content`)}
                placeholder="Message content"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <input
                {...register(`messages.${index}.delay`)}
                type="number"
                placeholder="Delay (seconds)"
                className="w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                className="p-2 text-red-600 hover:text-red-700"
                onClick={() => {
                  const messages = watch('messages').filter((_, i) => i !== index);
                  register('messages', { value: messages });
                }}
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              const messages = watch('messages') || [];
              register('messages', {
                value: [...messages, { id: crypto.randomUUID(), content: '', delay: 0 }],
              });
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Message
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Campaign
      </button>
    </form>
  );
}
