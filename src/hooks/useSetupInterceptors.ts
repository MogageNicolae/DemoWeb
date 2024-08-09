import { useEffect } from "react";
import { useGetLoginInfo } from "./sdkDappHooks"
import { setupInterceptors } from "helpers/setupInterceptors";

export const useSetupInterceptors = () => {
    const { tokenLogin } = useGetLoginInfo();
    const nativeAuthToken = tokenLogin?.nativeAuthToken;

    useEffect(() => {
        if (!nativeAuthToken) {
            return;
        }
        console.log(nativeAuthToken);
        setupInterceptors(nativeAuthToken);
    }, [nativeAuthToken]);
}