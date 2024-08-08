import { useEffect, useState } from "react";
import { useGetAccount, useGetNetworkConfig } from "./sdkDappHooks"
import axios from "axios";
import { USER_TOKENS_KEY } from "../localConstants";
import { TokenType } from "@multiversx/sdk-dapp/types/tokens.types";

export const useFetchUserTokens = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [userTokens, setUserTokens] = useState<TokenType[]>();

    const { address } = useGetAccount();

    const { network } = useGetNetworkConfig();
    useEffect(() => {

        const fetchUserTokens = async () => {
            setLoading(true);
            const response = await axios.get(`${network.apiAddress}/accounts/${address}/tokens?withUsername=true&includeMetaESDT=true&size=1000`);

            if (!response.data || response.data.error) {
                setError("Error fetching user tokens");
                setLoading(false);
                return;
            }
            sessionStorage.setItem(USER_TOKENS_KEY, JSON.stringify(response.data));
            setUserTokens(response.data);
            setLoading(false);
        }

        const intervalId = setInterval(fetchUserTokens, 30000);
        fetchUserTokens();
        return () => clearInterval(intervalId);
    }, [address]);

    return {
        userTokens,
        isLoading: loading,
        isError: Boolean(error)
    }
};