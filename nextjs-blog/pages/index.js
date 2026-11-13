// Import the Next.js link component to create client-side navigation links for each post.
// Import the reusable date formatter so publication dates can be displayed in a readable format.
import Date from '../components/date';

// Import the page head component for setting the browser tab title and metadata.
import Head from 'next/head';
// Import the shared page layout and the site title constant used by the homepage header.
import Layout, { siteTitle } from './components/layout';
// Import the CSS module that contains the homepage styles used by this screen.
import utilStyles from './utils.module.css';

// Import the helper that reads the JSON data and returns blog metadata for the homepage.
import { getSortedPostsData } from '../lib/posts-json';

// Export a static page prop function so Next.js can preload the blog entries before rendering.
export async function getStaticProps() {
  // Call the JSON data helper to fetch all post metadata for the homepage list.
  const allPostsData = await getSortedPostsData();
  // Return the data object that will be passed into the Home component as props.
  return {
    props: {
      // Provide the blog post list to the homepage React component.
      allPostsData,
    },
  };
}

// Export the Home page component that renders the landing page and blog summary list.
export default function Home({ allPostsData }) {
  // Return the page structure, including the site layout and content sections.
  return (
    // Wrap the page in the shared site layout and mark this as the home page header.
    <Layout home>

      <Head>

        <title>{siteTitle}</title>
      </Head>
      

        <section className={`dropShadow maintainForeWhite `}>

          <section className={`${utilStyles.headingMd} foreWhite`}>

            <p>My name is Travis and I am presently studying web development at the Santa Rosa Junior College.</p>

            <section className={`${utilStyles.headingMd} foreBlue maintainForeBlue`}>

              <p>

                This website is utilizing a custom wordpress API to retrive and sort the blog data from a pantheon hosted wordpress site. {' '}

        
              </p>
            </section>
          </section>
        </section>


        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

          <h2 className={utilStyles.headingLg}>Blog</h2>

          <ul className={utilStyles.list}>

            {allPostsData.map(({ id, date, title, link1 }) => (

              <li className={utilStyles.listItem} key={id}>

                <a href={link1}>{title}</a>

                <br />

                <small className={utilStyles.lightText}>

                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>

    </Layout>
  );
}