import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';

function ActivityGoalIcon({ iconWidth, iconHeight, color, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={iconWidth}
      height={iconHeight}
      preserveAspectRatio="none"
      {...props}
    >
      <Defs>
        <ClipPath id="prefix__a">
          <Path fill="none" d="M0 0h53.353v56.24H0z" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#prefix__a)" fill={color}>
        <Path data-name="Path 46" d="M26.676 35.523h-8.5a2.163 2.163 0 000 4.326h8.5a2.163 2.163 0 100-4.326" />
        <Path data-name="Path 47" d="M35.175 26.83h-17a2.163 2.163 0 000 4.326h17a2.163 2.163 0 100-4.326" />
        <Path
          data-name="Path 48"
          d="M52.338 20.004A22.967 22.967 0 0040.173 4.537V2.163a2.163 2.163 0 10-4.326 0v.732c-.123-.032-.236-.085-.36-.114a37.647 37.647 0 00-17.621 0c-.124.029-.238.082-.361.114v-.732a2.163 2.163 0 10-4.326 0v2.374A22.969 22.969 0 001.014 20.004a40.3 40.3 0 000 17.967 22.863 22.863 0 0016.852 17.224 37.672 37.672 0 0017.621 0 22.864 22.864 0 0016.851-17.224 40.272 40.272 0 000-17.967M34.477 50.99a33.419 33.419 0 01-15.6 0A18.549 18.549 0 015.233 37.005a35.9 35.9 0 010-16.035 18.72 18.72 0 017.965-11.475 2.155 2.155 0 004.309-.081V7.421c.455-.15.9-.323 1.37-.435a33.392 33.392 0 0115.6 0c.471.112.915.285 1.37.435v1.993a2.156 2.156 0 004.31.081 18.728 18.728 0 017.965 11.475 35.9 35.9 0 010 16.035A18.55 18.55 0 0134.477 50.99"
        />
      </G>
    </Svg>
  );
}

export default ActivityGoalIcon;
