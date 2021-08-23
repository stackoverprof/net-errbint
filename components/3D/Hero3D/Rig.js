import { useFrame, useThree } from 'react-three-fiber/web.cjs';

const Rig = ({ mouse }) => {
	const { camera } = useThree();
	useFrame(() => {
		camera.position.x += (mouse.current[0] / 50 - camera.position.x) * 0.05;
		camera.position.y += (-mouse.current[1] / 50 - camera.position.y) * 0.05;
		camera.lookAt(0, 0, 0);
	});
	return null;
};

export default Rig;
