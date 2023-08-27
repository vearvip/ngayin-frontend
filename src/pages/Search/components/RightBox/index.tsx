import { Component, createEffect, createMemo, createSignal, For, onMount, Show } from 'solid-js'
import styles from '../../index.module.less' 
import Skeleton from "@/components/Skeleton"; 
import { Zi } from "@/types"; 
import { makeBr } from "@/utils";

interface RightBoxProps {
  searchData: Zi[]
}

const RightBox: Component<RightBoxProps> = (props) => { 
  const {
    searchData
  } = props

  return <>
<div class={styles.right_box}>
          <Show when={searchData.length > 0} fallback={<>
            {/* <Skeleton.Image active={loading} style={{ marginBottom: 20 }} />
              <Skeleton active={loading} /> */}
            右侧空白
          </>}>
            <For each={searchData}>
              {
                (ziItem) => {
                  return <>
                    <img src={ziItem.zitu} class={styles.zitu} />
                    <div innerHTML={makeBr(ziItem.xinhuashiyi)}></div>
                  </>
                }
              }
            </For>
          </Show>
        </div>
  </>
}


export default RightBox
