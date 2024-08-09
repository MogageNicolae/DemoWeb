import { useState } from 'react';
import axios from 'axios';
import { API_URL } from 'config';
import { ProfileType } from 'types';
import { useGetAccountInfo } from 'hooks/sdkDappHooks';

export const useGetProfile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useGetAccountInfo();

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/accounts/' + address, {
        baseURL: API_URL
      });

      if (data) {
        setProfile(data);
      }
    } catch (err) {
      console.error('Unable to fetch profile');
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, getProfile, isLoading };
};
