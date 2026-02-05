import NavBar from '@/components/header/NavBar';
import Hero from '@/components/index/Hero';
import ItemsSection from '@/components/index/ItemsSection';
import OfferSection from '@/components/index/OfferSection';
import StorySection from '@/components/index/StorySection';
import JournalSection from '@/components/index/JournalSection';
import TestimonialsSection from '@/components/index/TestimonialsSection';
import FooterSection from '@/components/footer/CommonFooter';
import SectionDivider from '@/components/index/SectionDivider';

export default function IndexPage() {


	return (
		<div style={{ minHeight: '100vh' }}>
			<NavBar />
			<Hero/>
			<main>
				<ItemsSection/>
				<SectionDivider/>
				<OfferSection />
				<SectionDivider />
				<StorySection />
				<JournalSection />
				<SectionDivider />
				<TestimonialsSection/> 
			</main>
			<FooterSection/> 
		</div>
	);
}
