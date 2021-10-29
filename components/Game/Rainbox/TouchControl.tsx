import React from 'react';

interface Props {
    leftTouchRef: React.LegacyRef<HTMLDivElement>;
    rightTouchRef: React.LegacyRef<HTMLDivElement>;
}

const TouchControl = ({leftTouchRef, rightTouchRef}: Props) => {
	return (
		<div className="absolute inset-0 pointer-events-none flex-cc col full" style={{zIndex: 0 }}>
			<div className="flex-cc full">
				<div className="w-1/2 h-full pointer-events-auto select-none opacity-20" ref={leftTouchRef}></div>
				<div className="w-1/2 h-full pointer-events-auto select-none opacity-20" ref={rightTouchRef}></div>
			</div>
		</div>
	);
};

export default TouchControl;
