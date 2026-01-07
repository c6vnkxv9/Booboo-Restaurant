import { useEffect } from 'react';
import NavBar from '@/components/header/NavBar';
import Hero from '@/components/index/Hero';
import ItemsSection from '@/components/index/ItemsSection';
import OfferSection from '@/components/index/OfferSection';
import StorySection from '@/components/index/StorySection';
import JournalSection from '@/components/index/JournalSection';
import TestimonialsSection from '@/components/index/TestimonialsSection';
import FooterSection from '@/components/footer/CommonFooter';
import SectionDivider from '@/components/index/SectionDivider';

// 簡單的色票便於重複使用
const palette = {
	ink: '#2F3C4F',
	clay: '#A63D40',
	wood: '#6B4226',
	paper: '#F2EDE4',
	shadow: '#4A4A4A',
	earth: '#8B7B63',
};

const items = [
	{
		title: '手摘み煎茶セット',
		desc: '熟練の茶師が手摘みした、芳醇な香りの煎茶と伝統的な茶器。',
		price: '¥1,800',
		badge: '新作',
		badgeColor: palette.wood,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuD67cnkXs6Di5_UmT5kwA3mr_NmcReZhLR420JYkTt7DIwb1fyMClThqVrqd1ktLfFcCF97WDthgn-wi0NlPY3TvsDngodWTyLbg-6NnILmPtgn99gww1OY1GrrlGmU_B8hR_LXx3UXClPLAzzDY6sO82K26XTYTdCRuDBuPDf5VRZ676VGTxLHk2uHOdO2AWCtP-pGujEp82PRSMiV38R24hlu5QU8Ssk_5qAQSrSTBxNCfPPM8MshTlSiBw714qYAFfGv-lxVfUGX',
	},
	{
		title: '季節の和菓子盛り合わせ',
		desc: '季節の移ろいを感じさせる繊細な和菓子を丁寧に詰めました。',
		price: '¥2,500',
		badge: '限定品',
		badgeColor: palette.clay,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDkTI01Gs7ApsLCJQAaEz5cup1BfbXVYUFCXsO7qn8tUt1T4GLX1k1lfCDqFDxM_EQkMjEPu0u97Oh6Vfiz_fhcIc6qv3keRpe550iZbl_YWWDcp3FiXqUzaQ32gQpnPOCwDgbnBKMJa0tA_PlNGGGIouiEjy8iNuvuGCbXGm8tJrwJRyYDlqjgdjTGB6-7Ijf0gXwKojvkun47W3YcwMis_V24bg1aULiW0TNr2ZUNGmAzJJt6ksmNdjDdQtqXob5NYGB5fS6X1Vbt',
	},
	{
		title: '手作り蕎麦打ちキット',
		desc: '自宅で本格的な手打ち蕎麦を楽しめる厳選素材と道具のセット。',
		price: '¥3,200',
		badge: '人気',
		badgeColor: palette.ink,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuCF-DZJg7NS-L9qhtbpDGoO1oUTR-6v9vnuBu_zXcWEVGgvL6NsQjffHXzxacHcR6ROdcmAmcDzJ6q1RTJRaO4UDmSyxIBWHNLWi-3okqspMGsPUrJ75JAVm2gXTatb0bGwX8Kvp2fF_ay3xHcL92WDH7BZ_I1W_RAElrn8lT-xsOvnqWJU-iwklS2-7h9p73IAUJZGsCkkFWLh7M4qDjatzoAe5Fis9ul1kcivMlPohdhA6vAXGoy25iwRQgbuca_twOPuuF-lnnyx',
	},
	{
		title: '旬の野菜詰め合わせ',
		desc: '地元の農家から届く採れたて野菜。季節の味をそのままお届け。',
		price: '¥2,000',
		badge: '農園直送',
		badgeColor: palette.earth,
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDmAHJVLQtLVzdAU74wq3IIvCfrE2Hc1xEtVw9iDd0d4HcdGWAXFZAdNUV9iVA2dMKCpVQwV1FPQO4wzfIXavCshZtg1X-wiVayB3bMNx1vcBD1L4UhJNqMtkY38xhF20uGLeb_WElbdEUgQ9g5NfptVWoR3aLgPpZ5NjXphuva3dkibvSGNaZBRZfyihmmv6hrJgl3qL_OS0tQviQsSvk8aIH9fynzn0OMczh4xtlR_-1tTJExFQ9B7q_hu-WMrH-4NJaHrX4BnVTV',
	},
];

const blogs = [
	{
		title: '完璧な出汁の秘訣',
		date: '2023年10月12日',
		tag: 'レシピ',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDmAHJVLQtLVzdAU74wq3IIvCfrE2Hc1xEtVw9iDd0d4HcdGWAXFZAdNUV9iVA2dMKCpVQwV1FPQO4wzfIXavCshZtg1X-wiVayB3bMNx1vcBD1L4UhJNqMtkY38xhF20uGLeb_WElbdEUgQ9g5NfptVWoR3aLgPpZ5NjXphuva3dkibvSGNaZBRZfyihmmv6hrJgl3qL_OS0tQviQsSvk8aIH9fynzn0OMczh4xtlR_-1tTJExFQ9B7q_hu-WMrH-4NJaHrX4BnVTV',
	},
	{
		title: 'おもてなしの心',
		date: '2023年9月28日',
		tag: '文化',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuCAf5M8Pbdi6PVYe40STTOP8iYwW4mKbuC_CF6eamE1tGl-LShJxB9jY-ypZuozLdO-X8liUXlyra2ErniSmrikroGYJbgN7_vrqNffFjnPnCx0UhKmWgryXBn-PVkwfzRpfEhrtAtt7honp37Cw_U3uAmz4Tt4p6d950XqRnKJ4aO6Chftr6Xd2umJNoKfB87UwyBgzJKKP8gLcPSF-OlA0nMknHK3o04gcuob94y62XfPv-r78N_y9_xmXyU9m55jBW-j4OOACJ19',
	},
	{
		title: '秋の日本酒ペアリング',
		date: '2023年9月15日',
		tag: '案内',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDTaf1yg3VV1bEHjf8pQelUs3r63zPeCMLt5l9nf-zKWb5lJdn48fahM0lD0zyc8K8JHZjBUcvfN1U0nea8yZ3qr4PGbJu4aP3pna0hahtko0tlMaDa3Np6rwb-kX47-S2DvHHs25nYMr-SMQglvXG6citX_jIzzq_wOKoN7DoyH6ZqdAiLj7v6WveJEDCWB3PZ2ObiJJ8BsmIqk08uBZepz2iuEOvweBDODG6x2Yc4-5-cPvNyoXHcBVRBoh4N6T-FQKuGTStDN0jb',
	},
];

const testimonials = [
	{
		name: '佐藤 結美',
		quote:
			'抹茶セットは完璧に梱包されて届きました。香りが信じられないほど豊かで癒されました。',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuChbhzJ3JxxcXJj4xC2LoX0oWN1fE1b1edvCUuv6XJkSwweDsD--YPVsZMFZ_KIWkkgTVIYeXXvNmqY6NE9Dk3l32Uzn8o7qGZ0R-yaviLIk5GOo0RJb4DafOmAavaNOef6p4nNWAB6I0k67TQQ6_66whfYvnlOuUWKPScOZE5_dYYEdasnip2ZKLTClinnaZMKo0d2gjV3Bcajlv16KLoDEVNC-jPKHJcA5c-VxDnl3vkI2tLEg2AzxgMekyPVAngXbY4WnoiQVioF',
		rating: 5,
	},
	{
		name: 'ジェームズ・ウィルソン',
		quote:
			'手作り蕎麦キットの包みは本当に美しく、家での特別な食事にぴったりでした。',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuC_3cHivXUZQpMbTClRGBHc82IDusKDZWKGh7ueaG9uTmsUZBWAOybQbxu4FxTWlBD37Seeo9IgG9Gv3tipQ2t7A2F5lvGPLkes8VMdRAyb4zmmzruTgJcqyg-4RWZDKc36v34_dJODbv5nbUr0bVoehDpqGEnT24kLNGbVgS_X5Fcf4S5CD76S5xPoicEqsNcetVkciaYNxtgLXZ-wjzZ-eKJ8SvYsBE1nut5Bh99feKC8DrmDh9xMdTPJsyssnfeuyJMUA9mT3I_3',
		rating: 5,
	},
	{
		name: '田中 恵子',
		quote:
			'迅速な配送で材料も新鮮。日誌のレシピも分かりやすく、また必ず注文します。',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBMhSf08_F3pa2zQ_5UAXFiutF-ZQnDQ9vsEH19Ne2U3RLcz8Aqw1feyTZiQgmG5RpEKz1jIkCGxAAqJqwitvKg40CxpfgmJqiUnJLajOF2D_En5-GkpO5AZYvW-UGAiJ5R0CwVkER8q8cvglmlK0-JP6rAP0B2fP-YeYmqxFww0pbggZydrm4FVaoWK8xwRhJvyFotHDvE1OWbI39lIZCjUUnzDjtfzoICHzmA-wLfCUdBXImaEd6bH9GdwlaOU8XYJqVJ-2laiRPu',
		rating: 4.5,
	},
];

export default function IndexPage() {
	// 載入 Google Font 與 Material Icons，避免在全域佈景設定中污染其它頁面
	useEffect(() => {
		document.title = 'BooBoo食堂';
		const head = document.head;
		const links = [
			{
				id: 'machiya-fonts',
				href: 'https://fonts.googleapis.com/css2?family=Kaisei+Opti:wght@400;700&family=Shippori+Mincho+B1:wght@400;600&display=swap',
			},
			{
				id: 'material-symbols',
				href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100@700,0@1&display=swap',
			},
		];
		links.forEach(({ id, href }) => {
			if (!document.getElementById(id)) {
				const link = document.createElement('link');
				link.id = id;
				link.rel = 'stylesheet';
				link.href = href;
				head.appendChild(link);
			}
		});
	}, []);

	const heroImage =
		'https://lh3.googleusercontent.com/aida-public/AB6AXuDOLZL6nT2AbtYuyVrudBkZ1uO-PS5Vd9CFTADE4CbSg36wV31IKT7DYbo2EKb1yE5uEcMn4AcS3AwibNdO3cEppqwkcZO-a3f7U3LR40xRy_Xvf5uZ3SuBeNK5WChYTrWJaLXRx-y8vjKqXDVfIiqZqwRqLN5Y9g4Zo_ftC0jwlbVWUIu-Sov4mRDvEOR3qP3Th0kuYc4AWxtYO72UZwHQEUOsnprKAaScN2m_FKV1xmAapwOszonWMBYBSR_H0tqOAXiCaUBIKrPq';

	const bgTexture = {
		backgroundColor: palette.paper,
		backgroundImage:
			"url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')",
	};

	return (
		<div style={{ ...bgTexture, color: palette.ink, minHeight: '100vh' }}>
			<NavBar palette={palette} />
			<Hero palette={palette} heroImage={heroImage} />
			<main style={{ marginTop: '-40px' }}>
				<ItemsSection palette={palette} items={items} />
				<SectionDivider color={palette.clay} />
				<OfferSection palette={palette} />
				<SectionDivider color={palette.clay} />
				<StorySection palette={palette} />
				<SectionDivider color={palette.clay} />
				<JournalSection palette={palette} blogs={blogs} />
				<SectionDivider color={palette.clay} />
				<TestimonialsSection palette={palette} testimonials={testimonials} />
			</main>
			<FooterSection palette={palette} />
		</div>
	);
}
