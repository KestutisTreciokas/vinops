/**
 * MS-0.5 CI fix: Next.js page files must NOT take `children` and
 * this route does not expose generateMetadata here (head.tsx covers metadata).
 * Delegate the page implementation to ./details/page.tsx.
 */
import DetailsPage from './details/page';

export default DetailsPage;
