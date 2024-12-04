import React from 'react';
import styles from '../../index.module.less'; // 引入 CSS Module
import Skeleton from "@/components/Skeleton";
import ToggleText from '../ToggleText';
import AutoFitText from '../AutoFitText';

/**
 * 解析方言数据，根据提供的数据结构生成解析后的信息数组。
 *
 * @param {Object.<string, any>} data - 包含方言名称及其对应信息字符串的对象。
 * @returns {Array<Object>} 解析后的方言信息数组。
 */
function parseDialectData(data) {
  const parsedData = [];

  for (const [dialectName, infoString] of Object.entries(data)) {
    const infos = [];
    // 按照 '\t' 分割字符串
    const entries = infoString.split('\t');

    for (const entry of entries) {
      // 查找音标和释义之间的分隔符（通常是第一个出现的大括号）
      const bracketIndex = entry.indexOf('{');
      let phonetic;
      let explain;

      if (bracketIndex !== -1) {
        // 如果有大括号，则分割音标和释义，并去除花括号
        phonetic = entry.substring(0, bracketIndex).trim();
        explain = entry.substring(bracketIndex + 1, entry.length - 1).trim(); // 去除花括号
      } else {
        // 如果没有大括号，则整个条目视为音标，释义为空
        phonetic = entry.trim();
        explain = '';
      }

      // 将音标和释义添加到infos数组中
      if (phonetic) { // 确保音标不为空
        infos.push({ phonetic, explain });
      }
    }

    // 添加解析后的信息到最终结果数组中
    parsedData.push({ dialectName, infos });
  }

  return parsedData;
}

/**
 * 左侧盒子组件，用于展示搜索数据。
 */
const LeftBox = (props) => {
  const { searchData } = props;

  return (
    <>
      <div className={styles.left_box}>
        {searchData.length > 0 ? (
          searchData.map((charItem, index) => {
            const charInfos = parseDialectData(charItem.charInfo);
            return (
              <div key={index} className={styles.char_box}>
                <ToggleText char={charItem.char}>
                  {charInfos.map((charInfo, infoIndex) => (
                    <div key={infoIndex} className={styles.char_info}>
                      <AutoFitText text={charInfo.dialectName} />
                      <div>
                        {charInfo.infos.map((info, subIndex) => (
                          <div key={subIndex} className={styles.info_item}>
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
            {/* <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} />
            <Skeleton active={loading} /> */}
            左侧空白
          </>
        )}
      </div>
    </>
  );
};

export default LeftBox;



