import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
    
const Loader = () => {
	const [loaded, setLoaded] = useState(false);

	const remover = () => {
		setLoaded(true);
		console.log('fallback triggered');
	};

	const handleOnLoad = () => {
		setLoaded(true);
		console.log('onload triggered');
	};

	useEffect(() => {
		window.onload = handleOnLoad;
		const timeout = setTimeout(remover, 2000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<>
			<AnimatePresence exitBeforeEnter>
				{!loaded && (
					<motion.div initial="visible" animate={{ opacity: 0.5, transition: { duration: 1 }}} exit={{ opacity: 0 }}>
						<div className="wrapper">
							<div className="loading">
								<div className="spinner">
									<div className="rect1"></div>
									<div className="rect2"></div>
									<div className="rect3"></div>
									<div className="rect4"></div>
									<div className="rect5"></div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			
			<style jsx>{`
				.wrapper {
					position: fixed;
					height: 100%;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #F5F5F5;
					transition: 1s;
					z-index: 50;
					top: 0;
					left: 0;
					padding-bottom: 10%;
				}

				.loading {
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					height: calc(100% - 60px);
					top: 0;
				}

				.spinner {
					margin: 100px auto;
					margin-top: 48px;
					margin-bottom: 68px;
					height: 50px;
					text-align: center;
					font-size: 10px;
				}
				
				.spinner > div {
					background-color: #333;
					height: 100%;
					width: 6px;
					display: inline-block;
					margin-right: 2px;
					margin-left: 2px;
					
					-webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
					animation: sk-stretchdelay 1.2s infinite ease-in-out;
				}
				
				.spinner .rect2 {
					background-color: #FF5B14;
					-webkit-animation-delay: -1.1s;
					animation-delay: -1.1s;
				}
				
				.spinner .rect3 {
					-webkit-animation-delay: -1.0s;
					animation-delay: -1.0s;
				}
				
				.spinner .rect4 {
					-webkit-animation-delay: -0.9s;
					animation-delay: -0.9s;
				}
				
				.spinner .rect5 {
					-webkit-animation-delay: -0.8s;
					animation-delay: -0.8s;
				}
				
				@-webkit-keyframes sk-stretchdelay {
					0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
					20% { -webkit-transform: scaleY(1.0) }
				}
				
				@keyframes sk-stretchdelay {
					0%, 40%, 100% { 
					transform: scaleY(0.4);
					-webkit-transform: scaleY(0.4);
					}  20% { 
					transform: scaleY(1.0);
					-webkit-transform: scaleY(1.0);
					}
				}
			`}</style>
		</>
	);
};
    
export default Loader;