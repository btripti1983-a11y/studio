import { useState, useEffect } from "react";

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        // This check only runs on the client side, where browser APIs are available.
        const userAgent = navigator.userAgent;
        
        // This is a standard and widely-used regex to detect a broad range of mobile devices.
        const isMobileViaUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        
        // The `navigator.platform` property can sometimes reveal the OS even if the user agent is spoofed.
        const isMobileViaPlatform = /iPad|iPhone|iPod|Android/i.test(navigator.platform);

        // The newer `userAgentData` API provides a more reliable way to detect mobile devices if the browser supports it.
        // The `.mobile` property is a simple boolean.
        const uaData = (navigator as any).userAgentData;
        let isMobileViaUaData = false;
        if (uaData) {
            isMobileViaUaData = uaData.mobile;
        }

        // If any of our checks return true, we consider it a mobile device.
        setIsMobile(isMobileViaUserAgent || isMobileViaPlatform || isMobileViaUaData);

    }, []); // Empty dependency array ensures this runs only once on mount.

    return isMobile;
}
