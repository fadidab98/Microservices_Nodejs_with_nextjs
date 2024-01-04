import Layout from '@/Components/client/Layout'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { initializeStore } from '@/Store/store';
import { getRunningQueriesThunk, getSetting } from '@/Store/User/settingApi';
const HomePage = dynamic(() => import('../Components/client/HomePage/Header/index'), { ssr: false,loading:()=> <div>Loading...</div>});
const OuerServices = dynamic(() => import('../Components/client/HomePage/OurServices'), { ssr: false,loading:()=> <div>Loading...</div>});
const Contact = dynamic(() => import('@/Components/client/Contact/Contact'), { ssr: false,loading:()=> <div>Loading...</div>});

 export async function getStaticProps({context,locale}){
  const store = initializeStore();

  await store.dispatch(getSetting.initiate())
  await Promise.all(store.dispatch(getRunningQueriesThunk()))
  const {data:setting}= await getSetting.select()(store.getState())

  console.log("data :",setting)
  return{
    props:{locale:locale,data:setting}
  }

 }
export default function Home(props) {
  console.log(props.data.data.seo_image)
  return (
    <Layout locale={props.locale}>
      <Head>
        <title>Alwadi House |{props.locale}</title>
        <link rel="preload" href={"https://res.cloudinary.com/demo/image/fetch/f_auto/"+props.data.data.seo_image} as="image" />

      </Head>
      <HomePage image={props.data.data.seo_image}/>
      <OuerServices data={props.data.data}/>
          <Contact t_email={props.data.data.technical_email} t_mobile={props.data.data.technical_mobile } b_email={props.data.data.bug_email} b_mobile={props.data.data.bug_mobile}/>
     </Layout>

  )
}
