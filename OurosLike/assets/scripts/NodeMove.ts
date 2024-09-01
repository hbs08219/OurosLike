import { _decorator, Canvas, Component, EventTouch, Node, Sprite, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NodeMove')
export class NodeMove extends Component {

    @property(Canvas)
    canvas:Canvas;

    start() {
        this.node.on(Node.EventType.TOUCH_MOVE,this.onTouchMove,this)
    }

    onTouchMove(touch:EventTouch)
    {
        const uiLocation = touch.getUILocation();
        const uiWorldLocation:Vec3 = new Vec3(uiLocation.x,uiLocation.y,0);
        let nodeAUITrans = this.node.parent.getComponent(UITransform)!;
        let location:Vec3 = nodeAUITrans.convertToNodeSpaceAR(uiWorldLocation);

        this.node.setPosition(location);
    }
}


