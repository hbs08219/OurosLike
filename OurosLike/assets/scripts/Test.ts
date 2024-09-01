import { _decorator, Color, Component, Graphics, log, Vec2,Node, Vec3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Test')
export class Test extends Component {

    @property(Node)
    startPoint: Node;

    @property(Node)
    controlPoint1: Node;

    @property(Node)
    controlPoint2: Node;

    @property(Node)
    endPoint: Node;

    start() {
    }

    update(deltaTime: number) {
        this.drawLine();
    }

    drawLine() {
        let ctx = this.getComponent(Graphics);
        ctx.clear();
        let startPosition:Vec3 = this.startPoint.position;
        ctx.moveTo(startPosition.x, startPosition.y);

        let controlPosition1:Vec3 = this.controlPoint1.position;
        let controlPosition2:Vec3 = this.controlPoint2.position;

        let endPosition:Vec3 = this.endPoint.position;
        ctx.bezierCurveTo(controlPosition1.x, controlPosition1.y, controlPosition2.x, controlPosition2.y, endPosition.x, endPosition.y);
        ctx.stroke();
    }

    createBezierCurve(startPoint: Vec2, controlPoints: Vec2[], endPoint: Vec2, segments: number): Vec2[] {
        const points: Vec2[] = [];
        const n = controlPoints.length;
    
        function getBezierPoint(t: number): Vec2 {
            let point = new Vec2();
    
            // Calculate the starting point
            point.add(startPoint.clone().multiplyScalar(Math.pow(1 - t, n)));
    
            // Calculate the control points
            for (let i = 0; i < n; ++i) {
                point.add(
                    controlPoints[i]
                        .clone()
                        .multiplyScalar(Math.pow(1 - t, n - 1 - i) * Math.pow(t, i) * binomialCoefficient(n - 1, i))
                );
            }
    
            // Calculate the ending point
            point.add(endPoint.clone().multiplyScalar(Math.pow(t, n)));
    
            return point;
        }
    
        function binomialCoefficient(n: number, k: number): number {
            let result = 1;
            for (let i = 1; i <= k; ++i) {
                result = (result * (n - i + 1)) / i;
            }
            return result;
        }
    
        for (let i = 0; i <= segments; ++i) {
            const t = i / segments;
            points.push(getBezierPoint(t));
        }
    
        return points;
    }
}


