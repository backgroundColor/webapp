// @flow
import React from 'react'
import styles from './HeaderLogo.css'

const HeaderLogo = ({ title = 'starter-kit' }: { title: string }) => (
  <div className={styles['header-logo']}>
    <img src={'/logo.png'} />
    {title}
  </div>
)

export default HeaderLogo
