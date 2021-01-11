import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useInstagramUser(url) {
  const profileUrl = `${url}/?__a=1`.replace(/([^:])(\/\/+)/g, '$1/');
  const { data, error } = useSWR(profileUrl, fetcher);
  return {
    user: data?.graphql?.shortcode_media.owner,
    isLoading: !error && !data,
    isError: error,
  };
}
