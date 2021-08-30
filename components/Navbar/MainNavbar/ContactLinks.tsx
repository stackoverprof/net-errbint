import Link from '@components/_shared/Link';
import React from 'react';

const ContactLinks = () => {
	return (
		<div className="flex-cc gap-2 group">
			<Link href="https://github.com/stackoverprof/" target="_blank">
				<div className="item-group item-group-gh flex-cc gap-3">
					<img src="/img/icons/gh.svg" className="group-hover:opacity-40"/>
					<p className="text-white overflow-hidden whitespace-nowrap">stackoverprof</p>
				</div>
			</Link>
			<Link href="https://instagram.com/errbint" target="_blank">
				<div className="item-group item-group-ig flex-cc gap-3">
					<img src="/img/icons/ig.svg" className="group-hover:opacity-40"/>
					<p className="text-white overflow-hidden whitespace-nowrap">@errbint</p>
				</div>
			</Link>
			<Link href="https://line.me/ti/p/FwXuuM_qrV" target="_blank">
				<div className="item-group item-group-line flex-cc gap-3">
					<img src="/img/icons/line.svg" className="group-hover:opacity-40"/>
					<p className="text-white overflow-hidden whitespace-nowrap">@r.bintang11</p>
				</div>
			</Link>
			<Link href="https://wa.me/628988355006" target="_blank">
				<div className="item-group item-group-wa flex-cc gap-3">
					<img src="/img/icons/wa.svg" className="group-hover:opacity-40"/>
					<p className="text-white overflow-hidden whitespace-nowrap">+62 8988355006</p>
				</div>
			</Link>
			<Link href="https://www.linkedin.com/in/r-bintang-bagus-putra-angkasa-41a6b1188" target="_blank">
				<div className="item-group item-group-lkdn flex-cc gap-3">
					<img src="/img/icons/lkdn.svg" className="group-hover:opacity-40"/>
					<p className="text-white overflow-hidden whitespace-nowrap">R.Bintang Bagus</p>
				</div>
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
