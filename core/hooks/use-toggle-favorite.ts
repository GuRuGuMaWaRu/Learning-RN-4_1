import { client } from '@/core/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ToggleFavoriteParams = {
  propertyId: string;
  currentFavoriteStatus: boolean;
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ propertyId }: ToggleFavoriteParams) => {
      const response = await client.post(`/favorites/${propertyId}`);
      return response.data;
    },
    onMutate: async ({ propertyId, currentFavoriteStatus }: ToggleFavoriteParams) => {
      await queryClient.cancelQueries({ queryKey: ['properties'] });

      const previousProperties = queryClient.getQueryData<Property[]>(['properties']);

      queryClient.setQueryData<Property[]>(['properties'], (old) => {
        if (!old) return [];

        return old.map((property) => {
          if (property.id === propertyId) {
            return {
              ...property,
              is_favorite: !currentFavoriteStatus,
            };
          }
          return property;
        });
      });

      return { previousProperties };
    },
    onError(_error, _variables, context) {
      if (context?.previousProperties) {
        queryClient.setQueryData(['properties'], context.previousProperties);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};
