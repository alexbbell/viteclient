import { type SiteLink } from './Interfaces'

class Menu {
  /**
     *
     * Class to return menu items for the specific block.
     * The main function is the 'fetchMenUItems', input parameter is the string[] of links
     *
     */
  private readonly _menuItems: SiteLink[]
  constructor () {
    this._menuItems = [
      { url: '/', label: 'home' },
      { url: '/skills', label: 'skills' },
      { url: '/experience', label: 'experience' },
      { url: '/blogs', label: 'blogs' },
      { url: '/about', label: 'about' },
      { url: '/contacts', label: 'contacts' },
      { url: '/sitemap', label: 'sitemap' },
      { url: '/resume', label: 'resume' },
      { url: '/lngmngr', label: 'lngmngr' },
      { url: '/math', label: 'math' },
      { url: '/services', label: 'services' }

    ]
  }

  /**
     * @param items string[] of values: 'home' | 'skills' | 'experience' | 'blogs' | 'about' | 'contacts' | 'sitemap' | 'resume'
     * @returns
     */
  fetchMenUItems = (items: string[]): SiteLink[] => {
    const siteItems: SiteLink[] = this._menuItems.filter(function (item) {
      return items.includes(item.label)
    })
    return siteItems
  }
}

export default Menu
