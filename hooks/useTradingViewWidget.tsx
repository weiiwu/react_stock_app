'use client';
import { useEffect, useRef } from "react";

const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
    const containRef = useRef<HTMLDivElement | null>(null);

    useEffect(

        () => {

            if (!containRef.current) return;
            if (containRef.current.dataset.loaded) return;
            containRef.current.innerHTML = `<div class="tradingview-widget-container__widget style="width: 100%; height: ${height}px;"></div>`

            const script = document.createElement("script");
            script.src = scriptUrl;
            script.async = true;
            script.innerHTML = JSON.stringify(config);

            containRef.current.appendChild(script);
            containRef.current.dataset.loaded = "true";

            return () => {
                if (containRef.current) {
                    containRef.current.innerHTML = "";
                    delete containRef.current.dataset.loaded;
                }
            };
        },
        [scriptUrl, config, height]
    );

    return containRef;

}

export default useTradingViewWidget