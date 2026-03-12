"use client";

import dynamic from 'next/dynamic';

export const BackgroundCanvas = dynamic(() => import('./BackgroundCanvas/BackgroundCanvas'), { ssr: false });
export const CustomCursor = dynamic(() => import('./CustomCursor/CustomCursor'), { ssr: false });
export const ScrollbarIndicator = dynamic(() => import('./ScrollbarIndicator/ScrollbarIndicator'), { ssr: false });
export const HelpDesk = dynamic(() => import('./HelpDesk/HelpDesk'), { ssr: false });
