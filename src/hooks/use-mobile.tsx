"use client";

import { useState, useEffect } from "react";

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        // This function runs a series of strict security checks to determine if the device is a mobile phone.
        // It operates on a "fail-closed" principle: if any check fails or is uncertain, it assumes mobile.
        const runDeviceChecks = () => {
            // Check 1: Touch Capability
            // If the device supports touch events, it's a strong indicator of a mobile device.
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                return true; // Is mobile
            }

            // Check 2: Hardware Specifications
            // Enforce minimum hardware requirements. Fail-closed if the information is unavailable.
            if (!navigator.hardwareConcurrency || navigator.hardwareConcurrency < 8) {
                return true; // Is mobile
            }
            // `deviceMemory` is an experimental API, but we enforce it as a requirement.
            if (!(navigator as any).deviceMemory || (navigator as any).deviceMemory < 8) {
                return true; // Is mobile
            }
            
            // Check 3: GPU / WebGL Renderer Identification
            // This is the strongest check, as mobile and desktop devices have distinct GPU vendors.
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
                        
                        // List of known mobile GPU vendors. If one is found, block access.
                        const mobileGpus = ['adreno', 'mali', 'powervr'];
                        if (mobileGpus.some(gpu => renderer.includes(gpu))) {
                            return true; // Is mobile
                        }

                        // As a stricter measure, ONLY allow known desktop-class GPU vendors.
                        // We include 'apple' to support Apple Silicon Macs.
                        const desktopGpus = ['nvidia', 'amd', 'intel', 'apple'];
                        if (!desktopGpus.some(gpu => renderer.includes(gpu))) {
                           return true; // Unrecognized GPU vendor, fail-closed.
                        }

                    } else {
                        // Fail-closed: If we cannot get renderer info, block access.
                        return true;
                    }
                } else {
                    // Fail-closed: If WebGL is not supported, block access.
                    return true;
                }
            } catch (e) {
                // If any error occurs during the WebGL check, fail-closed.
                return true;
            }


            // If all checks pass, the device is considered a desktop.
            return false;
        };

        // The state remains `undefined` until all checks are complete.
        // The DesktopOnly component will show a loader during this time.
        setIsMobile(runDeviceChecks());
        
    }, []); // Empty dependency array ensures this runs only once on mount.

    return isMobile;
}
