import Vue from "vue";
import {
  Avatar,
  Aside,
  Container,
  Header,
  Main,
  Button,
  Message,
  MessageBox,
  Scrollbar,
  Select,
  Image,
  Rate,
  // 时间选择
  TimeSelect,
  TimePicker,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Option,
  Menu,
  MenuItemGroup,
  Submenu,
  MenuItem,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Badge,
  Table,
  TableColumn,
  Tag,
  Tabs,
  TabPane,
  Timeline,
  TimelineItem,
  Card,
  Pagination,
  Notification,
  Dialog,
  DatePicker,
  Tree,
  Upload,
  Carousel,
  CarouselItem,
  PageHeader,
  Cascader
} from "element-ui";
Message.install = () => {
  Vue.prototype.$message = Message;
};
MessageBox.install = () => {
  Vue.prototype.$confirm = MessageBox.confirm;
};
Notification.install = () => {
  Vue.prototype.$notify = Notification;
};

Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Avatar);
Vue.use(Aside);
Vue.use(Button);
Vue.use(Message);
Vue.use(MessageBox);
Vue.use(Notification);
Vue.use(Scrollbar);
Vue.use(Image);
Vue.use(Rate);

Vue.use(TimeSelect)
Vue.use(TimePicker);
Vue.use(PageHeader);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Menu);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Badge);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Card);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Cascader)