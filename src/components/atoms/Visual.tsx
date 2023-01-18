import React, { useEffect, useRef, useState } from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { grey } from "@mui/material/colors";

// Fix: https://github.com/cookpete/react-player/issues/1428
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

// TODO: 이미지, 동영상 다른 컴포넌트로 분리하기

type Props = {
    src: string;
    sx?: SxProps;
    absolute?: boolean;
    coverBgColor?: string;
    onClick?: () => void;
    video?: boolean;
    children?: React.ReactNode;
    threshold?: number;
    labelSize?: number;
    responsive?: string;
    noLoading?: boolean;
    mobile?: string;
    noText?: boolean;
    noScale?: boolean;
    className?: string;
    noAfter?: boolean;
};
export default function Visual({
    src,
    sx,
    absolute,
    coverBgColor,
    onClick,
    video,
    children,
    threshold,
    labelSize,
    responsive,
    noLoading,
    mobile,
    noText,
    noScale,
    className,
    noAfter,
}: Props) {
    const imgRef = useRef(null);
    const [loaded, setLoaded] = useState<boolean>(src.includes("/images/") ? true : false);
    const [playing, setPlaying] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const { ref, inView, entry } = useInView({
        threshold: threshold ?? 0.05,
        // initialInView: true,
    });
    useEffect(() => {
        if (inView && loaded) {
            setShow(true);
        }
        // if (inView) {
        //     setShow(true);
        // }
        if (video) setPlaying(inView);
    }, [inView, loaded]);
    useEffect(() => {
        function imgLoaded(imgElement: any) {
            if (imgElement) setLoaded(imgElement.complete && imgElement.naturalHeight !== 0);
        }
        if (imgRef) imgLoaded(imgRef.current);
    }, []);
    return (
        <Box
            ref={ref}
            sx={
                absolute
                    ? {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          "& video": {
                              display: video ? "block" : "none",
                              opacity: noLoading || show ? 1 : 0,
                              objectFit: "cover",
                              zIndex: -1,
                              minheight: "100%",
                          },
                          "&.video::after": {
                              position: "absolute",
                              content: '""',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: "rgba(0,0,0,0.6)",
                              zIndex: 1,
                              display: noAfter ? "none" : "block",
                          },
                          ...sx,
                          clipPath: "content-box",
                          "&:hover img": {
                              transform: noScale ? "none" : "scale(1.2)",
                          },
                      }
                    : responsive
                    ? {
                          position: "relative",
                          width: "100%",
                          height: 0,
                          pt: responsive,
                          ...sx,
                          "& video": {
                              display: video ? "block" : "none",
                              opacity: show ? 1 : 0,
                              objectFit: "cover",
                              zIndex: -1,
                              minheight: "100%",
                          },
                          "&.video::after": {
                              position: "absolute",
                              content: '""',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: "rgba(0,0,0,0.6)",
                              zIndex: 1,
                          },
                          clipPath: "content-box",
                          "&:hover img": {
                              transform: noScale ? "none" : "scale(1.2)",
                          },
                      }
                    : {
                          position: "relative",
                          "& video": {
                              display: video ? "block" : "none",
                              opacity: noLoading || show ? 1 : 0,
                              objectFit: "cover",
                              zIndex: -1,
                              minheight: "100%",
                          },
                          "&.video::after": {
                              position: "absolute",
                              content: '""',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: "rgba(0,0,0,0.6)",
                              zIndex: 1,
                          },
                          ...sx,
                          clipPath: "content-box",
                          "&:hover img": {
                              transform: noScale ? "none" : "scale(1.2)",
                          },
                      }
            }
            onClick={onClick}
            className={`Visual${video ? " video" : ""}`}
        >
            {src === "" ? (
                <Box
                    sx={
                        responsive
                            ? {
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                              }
                            : {
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                              }
                    }
                >
                    <Typography
                        sx={{
                            fontSize: labelSize ?? 10,
                            lineHeight: 1,
                            fontWeight: "700",
                            color: grey[400],
                            textAlign: "center",
                            display: noText ? "none" : "initial",
                        }}
                        className="Label"
                    >
                        No
                        <br />
                        Images
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={
                        absolute
                            ? { width: "100%", height: "100%" }
                            : responsive
                            ? {
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                              }
                            : {}
                    }
                >
                    {video && (
                        <ReactPlayer
                            playsinline
                            url={src}
                            muted
                            loop
                            playing={playing}
                            width="100%"
                            height="100%"
                            config={{
                                file: {
                                    attributes: {
                                        poster: "/images/no-image.png",
                                    },
                                },
                            }}
                            onReady={() => {
                                setLoaded(true);
                            }}
                        />
                    )}
                    <img
                        ref={imgRef}
                        src={src}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: video ? "none" : "initial",
                            opacity: noLoading || show ? 1 : 0,
                            // opacity: 1,
                            transition: "all 0.35s ease",
                        }}
                        onLoad={() => {
                            setLoaded(true);
                        }}
                        className={className}
                        loading="lazy"
                    />
                    {(coverBgColor || children) && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: coverBgColor,
                                display: video ? "none" : "initial",
                            }}
                        >
                            {children}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}
