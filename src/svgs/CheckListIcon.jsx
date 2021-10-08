import * as React from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import { Factory } from 'native-base';

function CheckListIcon(props) {
  const FactoryView = Factory(CheckListIconComponent);
  return <FactoryView {...props} />;
}

function CheckListIconComponent({ iconWidth, iconHeight, ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 42.681 42.691"
      {...props}
    >
      <Defs>
        <ClipPath id="prefix__a">
          <Path fill="none" d="M0 0h42.681v42.691H0z" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#prefix__a)" fill="#cbad57">
        <Path
          data-name="Path 54"
          d="M16.765 12.214l-3.394 3.393-1.116-1.117a1.642 1.642 0 10-2.321 2.324l2.277 2.276 1.16-1.161 1.161 1.161 4.553-4.556a1.64 1.64 0 00-2.32-2.32"
        />
        <Path data-name="Path 55" d="M31.589 15.147h-7.97a1.642 1.642 0 000 3.285h7.97a1.642 1.642 0 000-3.285" />
        <Path
          data-name="Path 57"
          d="M16.765 23.601l-3.394 3.4-1.116-1.118a1.642 1.642 0 00-2.321 2.323l2.277 2.276 1.16-1.16 1.161 1.16 4.553-4.553a1.642 1.642 0 10-2.32-2.323"
        />
        <Path data-name="Path 58" d="M31.589 26.536h-7.97a1.642 1.642 0 000 3.284h7.97a1.642 1.642 0 100-3.284" />
        <Path
          data-name="Path 59"
          d="M41.876 14.293A18.087 18.087 0 0028.389.816a30.858 30.858 0 00-14.1 0A18.086 18.086 0 00.803 14.293a31.3 31.3 0 000 14.1 18.087 18.087 0 0013.486 13.482 30.858 30.858 0 0014.1 0 18.088 18.088 0 0013.487-13.474 31.272 31.272 0 000-14.1m-3.2 13.353a14.821 14.821 0 01-11.034 11.032 27.635 27.635 0 01-12.611 0A14.821 14.821 0 013.997 27.654a27.847 27.847 0 010-12.6A14.82 14.82 0 0115.031 4.023a27.608 27.608 0 0112.611 0 14.82 14.82 0 0111.034 11.031 27.818 27.818 0 010 12.6"
        />
        <Path data-name="Path 151" d="M12.211 19.09a1.638 1.638 0 002.32 0l-1.16-1.16z" />
        <Path data-name="Path 152" d="M12.211 30.477a1.638 1.638 0 002.32 0l-1.16-1.16z" />
      </G>
    </Svg>
  );
}

export default CheckListIcon;
