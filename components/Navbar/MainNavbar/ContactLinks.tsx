import Link from '@components/_shared/Link';
import React from 'react';

const ContactLinks = () => {
	return (
		<div className="flex-cc gap-4 group">
			<Link href="https://github.com/stackoverprof/" target="_blank">
				<img src="/img/icons/gh.svg" className="h-7 group-hover:opacity-40"/>
			</Link>
			<Link href="https://instagram.com/errbint" target="_blank">
				<img src="/img/icons/ig.svg" className="h-7 group-hover:opacity-40"/>
			</Link>
			<Link href="https://line.me/ti/p/FwXuuM_qrV" target="_blank">
				<img src="/img/icons/line.svg" className="h-7 group-hover:opacity-40"/>
			</Link>
			<Link href="https://wa.me/628988355006" target="_blank">
				<img src="/img/icons/wa.svg" className="h-7 group-hover:opacity-40"/>
			</Link>
			<Link href="https://www.linkedin.com/in/r-bintang-bagus-putra-angkasa-41a6b1188" target="_blank">
				<img src="/img/icons/lkdn.svg" className="h-7 group-hover:opacity-40"/>
			</Link>

			<style jsx>{`
				.item-group p {
					@apply transition-all w-0;
				}

				.item-group-gh:hover p {
					width: 132px;
				}
				.item-group-ig:hover p {
					width: 88px;
				}
				.item-group-line:hover p {
					width: 120px;
				}
				.item-group-wa:hover p {
					width: 150px;
				}
				.item-group-lkdn:hover p {
					width: 146px;
				}
			`}</style>
		</div>
	);
};

export default ContactLinks;
