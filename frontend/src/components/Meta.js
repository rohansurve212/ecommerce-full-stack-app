/** @format */
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To SheTenGai',
  description: 'Find the best products for the cheapest prices',
  keywords: 'electronics, buy electronics, cheap electronics',
}

export default Meta
