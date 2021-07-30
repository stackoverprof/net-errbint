import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

export type EnumType = 'primary' | 'danger' | 'success'

interface Props {
	type?: EnumType;
	message: string;
	handleClose(): void;
}

const AlertHandler = ({ type = 'primary', message, handleClose }: Props): JSX.Element => {
	const [hold, setHold] = useState(false);

	useEffect(() => {
		const AutoClose = setTimeout(handleClose, 7000);
		if (hold) clearTimeout(AutoClose);
		return () => clearTimeout(AutoClose);
	}, [hold]);

	return (
		<div className="centerer">
			<div
				className={`box flex-bc ${type} ${hold ? '' : 'animate-fade'}`}
				onClick={() => setHold(true)}
			>
				<p className="message">{message}</p>
				<i className="icon" onClick={handleClose}>
					<MdClose />
				</i>

				<div className="timeout-progress">
					<div className={`bar ${hold ? '' : 'animate-shrink'}`}></div>
				</div>
			</div>

			<style jsx>{`
				.centerer {
					z-index: 1000;
					position: fixed;
					bottom: 24px;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.message:first-letter {
					text-transform: uppercase;
				}

				.box {
					position: relative;
					z-index: 500;
					padding: 8px 12px 12px 12px;
					overflow: hidden;
					border-radius: 4px;
				}

				.box.primary {
					background: #2DA7FB;
					color: white;
				}

				.box.success {
					background: #67db8e;
					color: white;
				}

				.box.danger {
					background: #ec4141;
					color: white;
				}

				.animate-fade {
					animation-name: fade;
					animation-duration: 7s;
					animation-timing-function: ease-in;
				}

				@keyframes fade {
					0% {
						opacity: 1;
					}

					85% {
						opacity: 1;
					}

					100% {
						opacity: 0;
					}
				}

				.icon {
					margin-left: 16px;
					cursor: pointer;
				}

				.icon:hover {
					background: #fff2;
				}

				.timeout-progress {
					position: absolute;
					bottom: 0;
					right: 0;
					width: 100%;
					height: 4px;
					background: #fff4;
				}

				.timeout-progress .bar {
					height: 100%;
					background: #fff6;
				}

				.animate-shrink {
					animation-name: shrink;
					animation-duration: 7s;
					animation-timing-function: ease-in;
				}

				@keyframes shrink {
					from {
						width: 100%;
					}

					to {
						width: 0;
					}
				}
			`}</style>
		</div>
	);
};

export default AlertHandler;
