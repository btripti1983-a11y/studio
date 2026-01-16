import { useState, useEffect } from "react";

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        // This function runs all security checks to determine if the device is a mobile phone.
        const runDeviceChecks = () => {
            // Check 1: Touch Capability
            // If the device supports touch events, it's highly likely a mobile device.
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                setIsMobile(true);
                return;
            }

            // Check 2: Hardware Specifications
            // Enforce minimum hardware requirements to filter out lower-powered mobile devices.
            // Fail-closed: if the information is unavailable, we block access.
            if (!navigator.hardwareConcurrency || navigator.hardwareConcurrency < 8) {
                setIsMobile(true);
                return;
            }
            // `deviceMemory` is an experimental feature, but we enforce it as required.
            if (!navigator.deviceMemory || navigator.deviceMemory < 8) {
                setIsMobile(true);
                return;
            }
            
            // Check 3: GPU / WebGL Renderer Identification
            // This is a strong indicator, as mobile and desktop devices have distinct GPU vendors.
            try {
                const canvas = document.createElement('canvas');
                // Fallback to experimental-webgl if webgl is not available
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
                        
                        // List of known mobile GPU vendors. If one is found, block access.
                        const mobileGpus = ['adreno', 'mali', 'powervr'];
                        if (mobileGpus.some(gpu => renderer.includes(gpu))) {
                            setIsMobile(true);
                            return;
                        }

                        // As a stricter measure, allow only known desktop-class GPU vendors.
                        // We include 'apple' to support Apple Silicon Macs.
                        const desktopGpus = ['nvidia', 'amd', 'intel', 'apple'];
                        if (!desktopGpus.some(gpu => renderer.includes(gpu))) {
                           setIsMobile(true);
                           return;
                        }

                    } else {
                        // Fail-closed: If we cannot get renderer info, block access.
                        setIsMobile(true);
                        return;
                    }
                } else {
                    // Fail-closed: If WebGL is not supported, block access.
                    setIsMobile(true);
                    return;
                }
            } catch (e) {
                // If any error occurs during the WebGL check, fail-closed.
                setIsMobile(true);
                return;
            }


            // If all checks pass, the device is considered a desktop.
            setIsMobile(false);
        };

        runDeviceChecks();
        
    }, []); // Empty dependency array ensures this runs only once on mount.

    return isMobile;
}
