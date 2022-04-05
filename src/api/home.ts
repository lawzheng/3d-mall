import { request } from './index'

interface Banner {
  bg_color: string;
  end_time: string;
  gender: number;
  imgsrc: string;
  link: string;
  model: string;
  mpm_link: string;
  picture_desktop: string;
  picture_mobile: string;
  price_color: string;
  season: string;
  sport: string;
  start_time: string;
  sub_title: string;
  text_color: string;
  title: string;
  type: string;
  _id: string;
}

interface Hero {
  category: string;
  href: string;
  listing: string;
  model: string;
  name: string;
  picture_desktop: string;
  picture_mobile: string;
  slogen: string;
  text: string;
}

export interface HomeData {
  banner: Array<Banner>,
  hero: Array<Hero>
}

export const getHomePage = (params?: any) => {
  return request<HomeData>({
    method: 'GET',
    url: '/homepage',
    params
  })
}