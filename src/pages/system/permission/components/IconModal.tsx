import {
  Input,
  Button,
  Modal,
  Tabs,
  Tooltip
} from 'antd';
import React, { FC, useState, useEffect} from 'react';
import classNames from 'classnames';
import styles from './index.less'
const { TabPane } = Tabs;
const directionIcons = ['StepBackward', 'StepForward', 'FastBackward', 'FastForward', 'Shrink', 'ArrowsAlt', 'Down', 'Up', 'Left', 'Right', 'CaretUp', 'CaretDown', 'CaretLeft', 'CaretRight', 'UpCircle', 'DownCircle', 'LeftCircle', 'RightCircle', 'DoubleRight', 'DoubleLeft', 'VerticalLeft', 'VerticalRight', 'Forward', 'Backward', 'Rollback', 'Enter', 'Retweet', 'Swap', 'SwapLeft', 'SwapRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PlayCircle', 'UpSquare', 'DownSquare', 'LeftSquare', 'RightSquare', 'Login', 'Logout', 'MenuFold', 'MenuUnfold', 'BorderBottom', 'BorderHorizontal', 'BorderInner', 'BorderLeft', 'BorderRight', 'BorderTop', 'BorderVerticle', 'PicCenter', 'PicLeft', 'PicRight', 'RadiusBottomleft', 'RadiusBottomright', 'RadiusUpleft', 'RadiusUpright', 'Fullscreen', 'FullscreenExit']
const suggestionIcons = ['Question', 'QuestionCircle', 'Plus', 'PlusCircle', 'Pause', 'PauseCircle', 'Minus', 'MinusCircle', 'PlusSquare', 'MinusSquare', 'Info', 'InfoCircle', 'Exclamation', 'ExclamationCircle', 'Close', 'CloseCircle', 'CloseSquare', 'Check', 'CheckCircle', 'CheckSquare', 'ClockCircle', 'Warning', 'IssuesClose', 'Stop']
const editIcons = ['Edit', 'Form', 'Copy', 'Scissor', 'Delete', 'Snippets', 'Diff', 'Highlight', 'AlignCenter', 'AlignLeft', 'AlignRight', 'BgColors', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'Redo', 'Undo', 'ZoomIn', 'ZoomOut', 'FontColors', 'FontSize', 'LineHeight', 'Dash', 'SmallDash', 'SortAscending', 'SortDescending', 'Drag', 'OrderedList', 'RadiusSetting']
const dataIcons = ['AreaChart', 'PieChart', 'BarChart', 'DotChart', 'LineChart', 'RadarChart', 'HeatMap', 'Fall', 'Rise', 'Stock', 'BoxPlot', 'Fund', 'Sliders']
const webIcons = ['Lock', 'Unlock', 'Bars', 'Book', 'Calendar', 'Cloud', 'CloudDownload', 'Code', 'Copy', 'CreditCard', 'Delete', 'Desktop', 'Download', 'Ellipsis', 'File', 'FileText', 'FileUnknown', 'FilePdf', 'FileWord', 'FileExcel', 'FileJpg', 'FilePpt', 'FileMarkdown', 'FileAdd', 'Folder', 'FolderOpen', 'FolderAdd', 'Hdd', 'Frown', 'Meh', 'Smile', 'Inbox', 'Laptop', 'Appstore', 'Link', 'Mail', 'Mobile', 'Notification', 'PaperClip', 'Picture', 'Poweroff', 'Reload', 'Search', 'Setting', 'ShareAlt', 'ShoppingCart', 'Tablet', 'Tag', 'Tags', 'ToTop', 'Upload', 'User', 'VideoCamera', 'Home', 'Loading', 'Loading3Quarters', 'CloudUpload', 'Star', 'Heart', 'Environment', 'Eye', 'Camera', 'Save', 'Team', 'Solution', 'Phone', 'Filter', 'Exception', 'Export', 'CustomerService', 'Qrcode', 'Scan', 'Like', 'Dislike', 'Message', 'PayCircle', 'Calculator', 'Pushpin', 'Bulb', 'Select', 'Switcher', 'Rocket', 'Bell', 'Disconnect', 'Database', 'Compass', 'Barcode', 'Hourglass', 'Key', 'Flag', 'Layout', 'Printer', 'Sound', 'Usb', 'Skin', 'Tool', 'Sync', 'Wifi', 'Car', 'Schedule', 'UserAdd', 'UserDelete', 'UsergroupAdd', 'UsergroupDelete', 'Man', 'Woman', 'Shop', 'Gift', 'Idcard', 'MedicineBox', 'RedEnvelope', 'Coffee', 'Copyright', 'Trademark', 'Safety', 'Wallet', 'Bank', 'Trophy', 'Contacts', 'Global', 'Shake', 'Api', 'Fork', 'Dashboard', 'Table', 'Profile', 'Alert', 'Audit', 'Branches', 'Build', 'Border', 'Crown', 'Experiment', 'Fire', 'MoneyCollect', 'PropertySafety', 'Reconciliation', 'Rest', 'SecurityScan', 'Insurance', 'SafetyCertificate', 'Project', 'Thunderbolt', 'Block', 'Cluster', 'DeploymentUnit', 'Dollar', 'Euro', 'Pound', 'FileDone', 'FileExclamation', 'FileProtect', 'FileSearch', 'FileSync', 'Gateway', 'Gold', 'Robot', 'Shopping']
const logoIcons = ['Android', 'Apple', 'Windows', 'Ie', 'Chrome', 'Github', 'Aliwangwang', 'Dingding', 'WeiboSquare', 'WeiboCircle', 'TaobaoCircle', 'Html5', 'Weibo', 'Twitter', 'Wechat', 'Youtube', 'AlipayCircle', 'Taobao', 'Skype', 'Qq', 'MediumWorkmark', 'Gitlab', 'Medium', 'Linkedin', 'GooglePlus', 'Dropbox', 'Facebook', 'Codepen', 'Amazon', 'Google', 'CodepenCircle', 'Alipay', 'AntDesign', 'Aliyun', 'Zhihu', 'Slack', 'SlackSquare', 'Behance', 'BehanceSquare', 'Dribbble', 'DribbbleSquare', 'Instagram', 'Yuque', 'Alibaba', 'Yahoo']
 

type IconModalProps = {
    visible: boolean;
    selecteditem?: string;
    selectIcon: (values:any) => void;
    onFinish: (values:any) => void;
    onClose: (e:any) => void;
};
  
import * as allIcons from '@ant-design/icons';  

  
const IconModal: FC<IconModalProps> = (props) => {
    const {visible, onFinish, onClose, selectIcon,selecteditem} = props;

    const showIcon = (icon: any, iconType = 'Outlined') => {
        if (typeof icon === 'string') {
            let fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
            // let iconx = React.createElement(allIcons[fixIconName] || allIcons[icon], {className:classNames(styles.icon, {[styles.selectedicon]:icon===selecteditem}), onClick:selectIcon(icon)});    
            let iconx = React.createElement(allIcons[fixIconName] || allIcons[icon], {className:classNames(styles.icon, {[styles.selectedicon]:icon===selecteditem})}); 
            return iconx;
        }
        return;
    };
    
    return(
        <Modal
        title="图标选择"
        visible={visible}
        width='800px'
        onOk={onFinish}
        onCancel={onClose}
    >

    <Tabs defaultActiveKey="1" >
        <TabPane tab="方向性图标" key="1" >
            {directionIcons.map((item)=>{
                return <Tooltip title={item} key={item}> {showIcon(item)}</Tooltip>
                // return <Tooltip title={item} key={item}><Icon  type={item} className={classNames(styles.icon,{[styles.selectedicon]:item===selecteditem})} onClick = {()=>{selectIcon(item)}}/></Tooltip>
            })}
        </TabPane>
        <TabPane tab="指示性图标" key="2">
        {suggestionIcons.map((item)=>{
            return <Tooltip title={item} key={item}> {showIcon(item)}</Tooltip>
                // return <Tooltip title={item} key={item}><Icon  type={item} className={classNames(styles.icon,{[styles.selectedicon]:item===selecteditem})} onClick = {()=>{selectIcon(item)}}/></Tooltip>
            })}
        </TabPane>
        <TabPane tab="编辑类图标" key="3">
        {editIcons.map((item)=>{
                return <Tooltip title={item} key={item}> {showIcon(item)}</Tooltip>
            })}
        </TabPane>
        <TabPane tab="数据类图标" key="4" >
        {dataIcons.map((item)=>{
                return <Tooltip title={item} key={item}> {showIcon(item)}</Tooltip>
            })}
        </TabPane>
        <TabPane tab="网站通用图标" key="5">
        {webIcons.map((item)=>{
                return <Tooltip title={item} key={item}> {showIcon(item)}</Tooltip>
            })}
        </TabPane>
        <TabPane tab="品牌和标识" key="6">
        {logoIcons.map((item)=>{
                return <Tooltip title={item} key={item}> {showIcon(item)}</Tooltip>
            })}
        </TabPane>
    </Tabs>
    </Modal>
    )
};
export default IconModal;
