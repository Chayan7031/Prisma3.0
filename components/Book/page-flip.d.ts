declare module 'page-flip' {
  export interface PageFlipOptions {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    usePortrait?: boolean;
    startPage?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    [key: string]: any;
  }

  export interface FlipEvent {
    data: any;
    object?: any;
  }

  export class PageFlip {
    constructor(element: HTMLElement, setting: PageFlipOptions);
    loadFromHTML(items: NodeListOf<Element> | HTMLElement[] | Element[]): void;
    destroy(): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    flipNext(corner?: string): void;
    flipPrev(corner?: string): void;
    turnToPage(page: number): void;
    flip(page: number, corner?: string): void;
    on(event: string, callback: (e: FlipEvent) => void): void;
    off(event: string, callback?: (...args: any[]) => void): void;
    update(): void;
  }
}
