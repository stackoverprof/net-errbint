import Link from '@components/_shared/Link';
import React from 'react';

const ContactLinks = () => {
	return (
		<div className="flex-cc gap-4">
			<Link href="https://github.com/stackoverprof/" target="_blank">
				<img src="/img/icons/contact-icons/github.svg" className="h-7 w-7"/>
			</Link>
			<Link href="https://instagram.com/errbint" target="_blank">
				<img src="/img/icons/contact-icons/instagram.svg" className="h-7 w-7"/>
			</Link>
			<Link href="https://wa.me/628988355006" target="_blank">
				<img src="/img/icons/contact-icons/whatsapp.svg" className="h-7 w-7"/>
			</Link>
			<Link href="mailto:r.bintangbagus@gmail.com" target="_blank">
				<img src="/img/icons/contact-icons/email.svg" className="h-7 w-7"/>
			</Link>
			<Link href="https://www.linkedin.com/in/raden-bintang" target="_blank">
				<img src="/img/icons/contact-icons/linkedin.svg" className="h-7 w-7"/>
			</Link>
		</div>
	);
};

export default ContactLinks;
