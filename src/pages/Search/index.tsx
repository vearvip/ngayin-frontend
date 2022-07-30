import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import SearchInput from "~/src/components/SearchInput";
import { logo, logoText } from "~/src/utils/asstes"; 
import { Skeleton } from 'antd';
import { useRouter } from 'next/router'
// import request from '~/src/utils/request' 
import { Zi } from '~/src/types';
import { makeBr } from '~/src/utils';

// import { useSize } from 'ahooks'; 

const Search = (props: any) => {
  // console.log('props', props)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchData, setSearchData] = useState<Zi[]>([])

  const onSearch = async (value: any) => {
    console.log('value------', value)
    setLoading(true)
    setSearchData([])
    router.push('/Search?q=' + value, undefined, { shallow: true })
    try {
      const ret: {
        data: Zi[]
      } = await (fetch('https://www.fastmock.site/mock/5f99ddefce3c648ecfe8396d398bf461/asdf/ok').then(res => res.json()))
      // console.log({ret})
      setSearchData(ret.data) 
    } catch (error) {
      console.error(error) 
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setSearchData(props?.ssrSearchData ?? [])
  }, [props.ssrSearchData])

let tt = "<div>1.两点之间的距离大（跟“短”相对）。a）指空间：这条路很～。～～的柳条垂到地面。b）指时间：～寿。夏季昼～夜短。<br/>2.长度：南京长江大桥气势雄伟，铁路桥全～6772米。<br/>3.长处：特～。取～补短。一技之～。<br/>4.（对某事）做得特别好：他～于写作。<br/>5.（旧读zhàng）多余；剩余：～物。<br/>6.姓。</div>"
  return <React.Fragment>
    {/* {searchContentSize} */}
    <div className={styles.search_bar}>
      <div className={styles.logo_box}>
        <img className={styles.logo} src={logo as any} />
        <img className={styles.logo_text} src={logoText as any} />
      </div>
      <SearchInput
        defaultValue={props?.searchParams?.q}
        onSearch={onSearch}
        style={{
          width: '100%',
          // margin: '0 auto',
          // maxWidth: '100%'
          // marginLeft: 20
        }} />
      {/* {searchContentSize} */}
    </div>
    <div className={styles.search_content}>
      <div className={styles.left_box}>
        {
          searchData.length === 0
            ? <>
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
              <Skeleton active={loading} />
            </>
            : <div>
              {
                searchData.map((ziItem, ziIndex) => {
                  return <React.Fragment key={'ziIndex' + ziIndex}>
                    <h1>{ziItem.zi}</h1>
                    {
                      ziItem.fangyan.map((fangyanItem, fangyanIndex) => {
                        return <div key={'fangyanIndex' + fangyanIndex}>
                          <h4 style={{ display: 'inline-block', border: '1px solid red', borderRadius: 2, marginRight: 5, padding: '0 2px', }}>{fangyanItem.mingzi}</h4>
                          {
                            fangyanItem.yin.map((yinItem, yinIndex) => {
                              return <React.Fragment key={'yinIndex' + yinIndex}>
                                <h4 style={{ display: 'inline-block' }}>{yinItem.shengmu + yinItem.yunmu}</h4> 
                              </React.Fragment>
                            })
                          }
                          
                        </div>
                      })
                    }
                  </React.Fragment>
                })
              }
            </div>
        }
      </div>
      <div className={styles.right_box}>
        {
          searchData.length === 0
            ? <>
              <Skeleton.Image active={loading} style={{ marginBottom: 20 }} />
              <Skeleton active={loading} />
            </>
            : <div>
            {
              searchData.map((ziItem, ziIndex) => {
                return <React.Fragment key={'ziIndex' + ziIndex}>
                <img src={ziItem.zitu} style={{ width: 100, marginBottom: 20 }} />
                  {/* <div className={styles.right_box_content}>{ ziItem.xinhuashiyi }</div> */}
                  <div dangerouslySetInnerHTML={{ __html: makeBr(ziItem.xinhuashiyi) }}></div> 
                  {/* <span dangerouslySetInnerHTML={{ __html: '<h1>asdf</h1>'}}> </span>  */}
                  {/* <div dangerouslySetInnerHTML={{ __html: makeBr(ziItem.xinhuashiyi) }}></div>  */}
                  {/* {
                    JSON.stringify(makeBr(ziItem.xinhuashiyi))
                  } */}
                </React.Fragment>
              })
            }
            </div>
        }
      </div>
    </div>

  </React.Fragment>
}

Search.getInitialProps = async (ctx: { query: { q: any; }; }) => {
  // console.log('ctx', ctx.query)
  if (!ctx?.query?.q) {
    return {}
  }
  try {
    const ret: {
      data: Zi[]
    } = await (fetch('https://www.fastmock.site/mock/5f99ddefce3c648ecfe8396d398bf461/asdf/ok').then(res => res.json()))
    // console.log({ret})
    return {
      ssrSearchData: ret.data
    }
  } catch (error) {
    // console.error(error)
    return {}
  }
}

export default Search