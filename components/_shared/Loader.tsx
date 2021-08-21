import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
    
const Loader = () => {
	const [loaded, setLoaded] = useState(false);
	useEffect(() => setLoaded(true), []);

	return (
		<>
			<AnimatePresence exitBeforeEnter>
				{!loaded && (
					<motion.div initial="visible" animate={{ opacity: 0.5, transition: { duration: 1 }}} exit={{ opacity: 0 }}>
						<div className="fixed full flex-cs inset-0 bg-base transition-opacity duration-1000" style={{zIndex: 1000}}>
							<div className="relative flex-cc" style={{height: 'calc(100vh - 60px)'}}>
								<div className="spinner mt-12 mb-16 mx-auto h-14">
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