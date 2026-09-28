import { forwardRef, useState, type ImgHTMLAttributes } from 'react';

import './LazyImage.scss';

type LazyImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> & {
    src: string;
    alt: string;
};

export const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
    function LazyImage(
        { src, alt, className = '', onLoad, onError, ...imageProps },
        forwardedRef,
    ) {
        const [isLoaded, setIsLoaded] = useState(false);
        const [hasError, setHasError] = useState(false);

        const imageClassName = [
            'lazy-image__image',
            isLoaded ? 'lazy-image__image--loaded' : '',
            hasError ? 'lazy-image__image--error' : '',
            className,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <div className="lazy-image">
                {!isLoaded && !hasError && (
                    <span
                        className="lazy-image__placeholder"
                        aria-hidden="true"
                    />
                )}

                <img
                    {...imageProps}
                    ref={forwardedRef}
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className={imageClassName}
                    onLoad={(event) => {
                        setIsLoaded(true);
                        onLoad?.(event);
                    }}
                    onError={(event) => {
                        setHasError(true);
                        onError?.(event);
                    }}
                />
            </div>
        );
    },
);
