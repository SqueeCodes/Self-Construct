import { useMutation } from "@tanstack/react-query";


import { client } from "../../../lib/hono"; 
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.ai["generate-image"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.ai["generate-image"]["$post"]>["json"];


export const useGenerateImage = () => {
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async (json) => {
      const response = await client.api.ai["generate-image"].$post({ json });
      return await response.json();
    },
  });

  return mutation;
};
