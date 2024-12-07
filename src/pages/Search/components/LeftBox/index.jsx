import React, { useState, useEffect, useMemo } from 'react';
import styles from '../../index.module.less'; // 引入 CSS Module
// import Skeleton from "@/components/Skeleton";
// import ToggleText from '../ToggleText';
// import AutoFitText from '../AutoFitText';
import { Collapse } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useGetState } from 'ahooks';
import AutoFitText from '../../../../components/AutoFitText';
import { parseSplitStr } from '../../../../utils';

/**
 * 解析方言数据，根据提供的数据结构生成解析后的信息数组。
 *
 * @param {Object.<string, any>} data - 包含方言名称及其对应信息字符串的对象。
 * @returns {Array<Object>} 解析后的方言信息数组。
 */
function parseDialectData(data) {
  const parsedData = [];

  for (const [dialectName, infoString] of Object.entries(data)) {


    // 添加解析后的信息到最终结果数组中
    parsedData.push({ dialectName, infos: parseSplitStr(infoString) });
  }

  return parsedData;
}


/**
 * 左侧盒子组件，用于展示搜索数据。
 */
const LeftBox = (props) => {
  const { searchData } = props;
  const [activeKey, setActiveKey, getActiveKey] = useGetState([])


  const collapseItems = useMemo(() => {
    return (searchData || []).filter(ele => Object.keys(ele?.charInfo ?? {}).length > 0).map((charItem, index) => {
      console.log('charItem.charInfo', charItem.charInfo)
      const charInfos = parseDialectData(charItem.charInfo);
      console.log('--------', charInfos)
      return {
        label: <div className={styles.char}>
          {charItem.char}
          <div style={{
            fontSize: 14,
            marginLeft: 5,
            marginTop: 12
          }}>
            {
              activeKey.includes(charItem.char)
                ? <DownOutlined />
                : <UpOutlined />
            }
          </div>
        </div>,
        key: charItem.char,
        showArrow: false,
        children: (
          <div key={`char_box_${index}`} className={styles.char_box}>
            {charInfos.map((charInfo, infoIndex) => (
              <div key={`char_info_${index}_${infoIndex}`} className={styles.char_info}>
                <AutoFitText text={charInfo.dialectName} />
                <div>
                  {charInfo.infos.map((info, subIndex) => (
                    <div key={`info_item_${index}_${infoIndex}_${subIndex}`} className={styles.info_item}>
                      <span className={styles.phonetic}>{info.phonetic}</span>
                      <span className={styles.explain}>{info.explain}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      }
    })
  }, [searchData, activeKey])

  const handleCollapseChange = (activeKey) => {
    // console.log('args', args)
    setActiveKey(activeKey)
  }


  useEffect(() => {
    setActiveKey((searchData || []).map(ele => ele.char))

  }, [searchData])


  return (
    <>
      <div className={styles.left_box}>
        <Collapse
          ghost
          collapsible="header"
          items={collapseItems}
          activeKey={activeKey}
          onChange={handleCollapseChange} />
        {/* {searchData.length > 0 ? (
          searchData.map((charItem, index) => {
            const charInfos = parseDialectData(charItem.charInfo);
            return (
              <div key={`char_box_${index}`} className={styles.char_box}>

                <ToggleText char={charItem.char}>
                  {charInfos.map((charInfo, infoIndex) => (
                    <div key={`char_info_${index}_${infoIndex}`} className={styles.char_info}>
                      <AutoFitText text={charInfo.dialectName} />
                      <div>
                        {charInfo.infos.map((info, subIndex) => (
                          <div key={`info_item_${index}_${infoIndex}_${subIndex}`} className={styles.info_item}>
                            <span className={styles.phonetic}>{info.phonetic}</span>
                            <span className={styles.explain}>{info.explain}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </ToggleText>
              </div>
            );
          })
        ) : (
          <>
            <Skeleton /> 
            左侧空白
          </>
        )} */}
      </div>
    </>
  );
};

export default LeftBox;



