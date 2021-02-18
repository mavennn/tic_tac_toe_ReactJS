

class Renderer {

    trace (ray) {
        var a = ray.from	
        var aq = vec.sub(a, this.q)
        var ba = ray.dir		
        var aqba = vec.dot(aq, ba)	
        
        if (aqba > 0) return
        
        var aq2 = vec.dot(aq, aq)
        var qd = aq2 - this.r * this.r
        var D = aqba * aqba - qd
        
        if (D < 0) return
            
        var t = qd > 0 ? -aqba - Math.sqrt(D) : -aqba + Math.sqrt(D)	
        
        var sqrdist = t * t
        var at = vec.add(a, vec.mul(t, ba))
        
        return {at:at, sqrdist:sqrdist}
    }
}