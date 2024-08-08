import { TokenType } from "@multiversx/sdk-dapp/types/tokens.types";
import { useGetNetworkConfig } from "hooks"
import { USER_TOKENS_KEY } from "localConstants";
import { useCallback } from "react";

export const useResolveTokenDecimals = () => {
    const { network } = useGetNetworkConfig();

    return useCallback( (tokenId: string) => {
        const tokens:TokenType[] = JSON.parse(
            sessionStorage.getItem(USER_TOKENS_KEY) || '[]'
        );
        const foundToken = tokens.find((token) => token.identifier === tokenId);
        if(!foundToken){
            return network.numDecimals ?? 18;
        }
        return foundToken.decimals;
    
    }, []);
}