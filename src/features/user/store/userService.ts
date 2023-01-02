import { baseApi } from "src/store/api";

const extendedApi = baseApi.enhanceEndpoints({ addTagTypes: ["User"] }).injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      providesTags: (result) => (result ? [{ type: "User", id: result.id }] : []),
    }),
  }),
});

export const { useGetCurrentUserQuery } = extendedApi;
