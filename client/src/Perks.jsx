export default function Perks({selected,onChange}) {
  function handleCbClick(ev) {
    const {checked,name} = ev.target;
    if (checked) {
      onChange([...selected,name]);
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)]);
    }
  }
    //3.50
    return (
        <>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Wifi')} name="Wifi" onChange={handleCbClick}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
              </svg>
            <span>Wifi</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer">
            <input type="checkbox" checked={selected.includes('Air Conditioning')} name="Air Conditioning" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlUlEQVR4nO2RMQ7DIAxFn9oerpcoOVdznCLWdI2UjV4iS0QWKlUCkpgwNApP8mAb/W8bqAi4Ax/A7QzrtQJsAXH3YxLwbe7FpXSObzAV/IMpZvAuaNDFDBrfHIBbxmmuQO81HmsPVIZBs2VAVeA8ammKC9ACY4bwCDy9xokwgBbkYjTwEuT/g0msboT1JKnVtbBeYZUZHoyUXYtb9bsAAAAASUVORK5CYII=" />
            <span>AC – split-type ductless system</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Kitchen')} name="Kitchen" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABG0lEQVR4nO3WMStGURwG8J9R2en1CWQx+QJKeZXNYLOaEUYmg0UZfAIfgEGKT6CklMFgNgi9Sr2Wo1v/W5K497q9N3Wf+g+nzvN/nvP8z+1cWrT4xxjGBOawgplBCS/jAelLHQ7SQMI77nET6+NPe0YwiW6ks4sjrNdhYDYEL7GAvVg/4wqP36ST11lRkTFMYxGr2I8TXuPpB4G83nCL0xjNFpYw9ZvwEF4KCLxG9Cc4wFqYzUyP/jXiuwIGqlbhzys1aUAVQl39UlXHdfVNTRtofAQ5WgOpHYGGL2EvCJ0axMejV/bGFMZFkDZqMLAZvc7LkOaD1A8TVZLoBLcfvbJft1LYqfER2lYR3YguvxNlqhfc0idv0cIg8QGhtsNJepFHOwAAAABJRU5ErkJggg=="/>
            <span>Kitchen</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Refrigerator')} name="Refrigerator" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAArElEQVR4nO2UMQrCQBBFn2fRUgSv4RHiCWzETux+mTpHip4gbS5iFxmYIoLJ6q4rYnzwYSF/5rEhBO5ZAC3QJaQF5oxwAirSqHzPIPKkoNCOfuEA7HNLFHkrTVOy9GSVxKJnJN0boq+4ify8Bla5JfqZT1ifkOw8WSWx6C95BU3ndW2BBjgmpAGKMcnMC/YnLYGLx85D6XdszuZtT5CzD1yBTaBrz61n/fpR4wbrkW1AugdDDAAAAABJRU5ErkJggg=="/>
            <span>Refrigerator</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Free parking')} name="Free parking" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoUlEQVR4nO3UvQkCQRRF4Q+xDZvRRDe3AhMDIwuwIYsQKxBELMA1EgQjI2FMRjDaH3eWDdYDN7jw3jswwfCnJhlyhB+TY1YkaHI8xFyKBJ+hXwll+50JjrjiiQcOWGGQShBi9tjhFfsmteDDIvablgST2O+pBRnmOMW+TS0IXzljlFqwxhJjDGvsVxaU0WNBVboX5G1/17M40OT4tMEL6CFvHcqjLdF5klcAAAAASUVORK5CYII="/>
            <span>Free parking on premises</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('TV')} name="TV" onChange={handleCbClick}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span>TV with standard cable/satellite</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Dedicated workspace')} name="Dedicated workspace" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAuklEQVR4nO2UQQrCMBBF3856HfEQFi/gnbT2JnoHi1dwIW602rpw5wEigSkMGqkNI4j0w4cwGeYlIXzo9aGmwBlwRi6BVANKw+FOfNKApmgl9zyvB/z+EyVADtRABSylZgbIA98wswTUAcD124CLJSALAOaWgEQglXgBDCwBXfUyT4ddQby278IuVZCNqg+BGbAGdsBd7Ncr2fM9jQo1fNJ2mrE0tsXyERjFXPfQIfv3MYBbB4Dv/VM9AOA+qebuWeRfAAAAAElFTkSuQmCC"/>
            <span>Dedicated workspace</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Pets allowed')} name="Pets allowed" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaklEQVR4nO2WoUtEQRCHPz2RC55BLBpOUcFksKlRi8FwyaAignar7RCDURT8D7QYhQMxqpwarBaTQTCIyfPA4MnCCsuy+26XnYcI94MJ7zEz3y7zZuZBR/9ME8AycAt8AI9AJW/oDvANtCxrAgfAPNAjDR0DvhxQ256kwUcBUGXn0uDnAKgqw7Q0+LoN9BPYlYYqzXiAp0CRnNQPPHjAC3lBhzOgykalgV3AOvDWprZ9ktBJ4CqwfcTqu6ZHYSvQuiWg+0ZCNakOjec9YMSCvkpAN62kZf2+pA0H+CQVOgC8W0lnHX5zlk/ylNp21E7dsmb41HQ/mz5LqeALB9i1YyuWTzUV/OIAXwIFw2ccaKRuonv9B/GrppXw2NEmZcfh1IGj1NCBg/rZTFb39GbR08dDMeA7HbThAK96YkoecNQHtqWDVAutBA79KQ+4GrsAziJn72LG2LyJgRf0zevWbPapNwOsFkpHf68fn8PbdE+aRZIAAAAASUVORK5CYII="/>
            <span>Pets allowed</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Dryer')} name="Dryer" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABr0lEQVR4nM3Uz4tOYRQH8A/KAisjklHGyFIWGjYWlpLF+JFm5aVGsRtqlB+lptiasTFTagp7NWUtyUrj5z/wKo2GkCgbpafOrdvjvnPft/cW3zp1O8+93+8933Oewz/AZkzhJX7gJxYxjVEM9CtwAsu4jRGsx7p4voQFfMWbED2GTb0KtLGn5r012JeJvsUMjmPDShYtZwI7cS5iqEvR17ja6cWpsKjAGSxhNiI9t2oqTLgR8T7iDnZjbTp8Fb4XFSTSHVlVSzUVlUUS6a748XZY6nvJy2TP3QqCVNF4lyIXcRbbyoe5SCLMMdeDyCQe4Bse4rq4EyMrWDOMjz3YVWBrVDRZ1fhWCM1FJIHTNQK1ja8a4aGwZzwbgm5GuLLxCScjsfcvms6kC6UNUHsZC6Qm/YoPDnRYK19i5Itd1tNaSTiFZ7iCF0H4OdbGb0xgoz5xGE8q8pdxr1/yAmN4VJFPnu9vSmQi+lHGYEze6qZE0p24kOXSCN/XIJ7iUJabj1XTGD7kSw2PcbRpke1Z7iZuNSlyDe9wHgexJW53anxjWIUjMQDPg/xTLLr/H38Akr1sv/burkgAAAAASUVORK5CYII="/>
            <span>Dryer</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Washing Machine')} name="Washing Machine" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABZ0lEQVR4nMWVu07DQBBFTwFRkKCAlCiUkXg18AGhQEpFg5AoeHwDUPMLaeALeJkuPaTIXxAhOkPBS6GAIoiEoJWukLWsE7yW4UpXHnvGc72zsx74YywBAVD3ZACU+yXvAmEKgVA5nCKBAkaAArALTFi2DeNbFgt6N1SuH2iIBntAT4mjto0z+Xqy7TyxAuZrd3SN2oNWMFCglaL+dbH1rwIN4jEGLIrGjsOv9iCKKeAceI9saFudUkwrMA88KuEBsC4eSvABmPMVyAE3wBMw44ifBZ6Ba8UmFthWOVaJx5piNn0ETtQRQ7qfBvZFYxsMAy/AsY/ABdABLoEa8GGxJl9HsV4r6AJN4BaoAuNiVc+ugE/gyEdgS/WtEI+KYjZ8BHLqkDug5IgvydfUXiQWQD1uev1VZVkRjf0G3DtaOPFJLupX3LZO8ikwmSDP98DJu5zAKLAgGtuFfL+BU856ZCJHZkM/E3wBFTzKS7d3R/8AAAAASUVORK5CYII="/>
            <span>Washing Machine</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Breakfast')} name="Breakfast" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAABpklEQVR4nO3XT4hNYRjH8Q+lUKKwsGCFYmfn34KUjUgpUixEKSwkugtZ2ShLW1mzGVlYaETJwkKyIys2U7OQP6EZhlennltvzJmZe+59z1XmW7/Ove/p9Hzve85z3vdSzw2MY4MhsAJLs++vkHAkG1uANaVFVuIj3mE3ruNLyDzBYSzBPfzCoZIyyzAWxevyPo4/sVdhjmWFX+MSTuAWvmfnjmuBZ1HscdySnH0xIyk+F2MrrmS//CY60+RtnH+Kc1heQubDLM9KqsnVEjKXMdpj7mNLXL8KO6Ijh8pZTMZMTeDMsEQ2YypEut32A5uGIXMqBN5gcRxTjLfKIlzMZmUkZiXFeHW+ONtxB59n6bRPuB2vjYGzEY8avgIeYv2gRE7jW0ORbr7iZL8inT4l/sy1piLnByzSTbWU9MTOrDsGnar7ts1VZCFeFBLp5mXU6Wlfkwrm6FxkmrZwr6kW3BlZna03qXCmYsWvZU9LIimyayaZg3jeYqp6/z4H8KDBrm+0j1T19k8nc7fl5yVFqu3HX6zDhZp/Bp1CqeqtLX7P55nnv+M3CeufqJtzdYsAAAAASUVORK5CYII="/>
            <span>Breakfast</span>
          </label>
          <label className="border p-4 flex rounded-2xl gap-2 items-center pointer ">
            <input type="checkbox" checked={selected.includes('Cleaning available during stay')} name="Cleaning available during stay" onChange={handleCbClick}/>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABqElEQVR4nO3WzUtWQRTH8Y8pQoQkES0q0Ap0F1ER5cZaBEnQLqIWSSD9ByLSrkWr/oN2EVSbiFzmoheTQBFatGkTZelCCUF6RX1kYILhcu3eR+/zLMIfnMXlnjnfmcOZM4dt/Uc6jXk8aiZ0Nz6ihoVmgh9EaA13mwW9nEBXcPhfzm/wugJoN5YS8JOiBQH6ahOgIziBFrTGOLXE+jVAw1iLgCncy0Bnyga6iC+YxUCB76UEupENlgXPJos+F/iGtA7Fe5oH/Y39VYK7cDL57sAd/MyBL6KvDHggwgP0Qs7/45jDKu7jYGZDD3PS/8IWFCr2JpYzQb/jNnYlvmfwNvF5uVnoMYwXFNFX3MCOZKPX8Am36oG1xQp/VqJys9fnXBJnJ/YWwc5iBGP4Vgcsz56ip+wpD+DxFoGp/YnpLq1w8vcVwUMrrUvtGI19dxoT+FEntHS73Ej7Cqp6MudhCHZFBboaG8ffoMtxnDmPo/iVgb5LrlYlo8z12CDCNQnqxIcMNDz8pzRQ7Xiek+KGjzmH4nSxmkAnkmw0XL1xAAj9eU+zoNtSRuuK3NsSUbTUBAAAAABJRU5ErkJggg==" />
            <span>Cleaning available during stay</span>
          </label>
        </>
    );
}