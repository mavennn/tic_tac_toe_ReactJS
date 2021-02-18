import { Light } from './Light.js';
import { DirectionalLightShadow } from './DirectionalLightShadow.js';
import { Object3D } from '../core/Object3D.js';

function DirectionalLight(color, intensity) {

	Light.call( this, color, intensity );

	this.type = 'DirectionalLight';

	this.position.copy( Object3D.DefaultUp );
	this.updateMatrix();

	this.target = new Object3D();

	this.shadow = new DirectionalLightShadow();

}

DirectionalLight.prototype = Object.assign( Object.create( Light.prototype ), {

	constructor: DirectionalLight,

	isDirectionalLight: true,

	copy: function ( source ) {

		Light.prototype.copy.call( this, source );

		this.target = source.target.clone();

		this.shadow = source.shadow.clone();

		return this;

	}

} );


export { DirectionalLight };
function DirectionalLight( color, intensity ) {

	Light.call( this, color, intensity );

	this.type = 'DirectionalLight';

	this.position.copy( Object3D.DefaultUp );
	this.updateMatrix();

	this.target = new Object3D();

	this.shadow = new DirectionalLightShadow();

}

DirectionalLight.prototype = Object.assign( Object.create( Light.prototype ), {

	constructor: DirectionalLight,

	isDirectionalLight: true,

	copy: function ( source ) {

		Light.prototype.copy.call( this, source );

		this.target = source.target.clone();

		this.shadow = source.shadow.clone();

		return this;

	}

} );


function phong () {
	// Set shader sources
    gl.shaderSource( vs, document.getElementById( 'vs' ).textContent );
    gl.shaderSource( fs, document.getElementById( 'fs' ).textContent );

    // Compile shaders
    gl.compileShader( vs );
    gl.compileShader( fs );

    // Check that the shaders compiled correctly
    if ( !gl.getShaderParameter( vs, gl.COMPILE_STATUS ) ) {
        throw gl.getShaderInfoLog( vs );
    }

    if ( !gl.getShaderParameter( fs, gl.COMPILE_STATUS ) ) {
        throw gl.getShaderInfoLog( fs );
    }

    // Create shader program and attach shaders
    var program = gl.createProgram();
    gl.attachShader( program, vs );
    gl.attachShader( program, fs );

    // Link the program
    gl.linkProgram( program );

    // Check that the program linked correctly
    if ( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
        throw gl.getProgramInfoLog( program );
    }

    // Tell WebGL to use this program
    gl.useProgram( program );

    // Retrieve the attribute locations from the shader program
    program.aVertexPositionLoc = gl.getAttribLocation( program, 'aVertexPosition' );
    program.aVertexNormalLoc = gl.getAttribLocation( program, 'aVertexNormal' );

    // Retrieve the uniform locations from the shader program
    program.uPerspectiveMatrixLoc = gl.getUniformLocation( program, 'uPerspectiveMatrix' );
    program.uModelViewMatrixLoc = gl.getUniformLocation( program, 'uModelViewMatrix' );
    program.uNormalMatrixLoc = gl.getUniformLocation( program, 'uNormalMatrix' );
    
    program.uLightDirectionLoc = gl.getUniformLocation( program, 'uLightDirection' );
    program.uLightSpecularLoc = gl.getUniformLocation( program, 'uLightSpecular' );
    program.uLightDiffuseLoc = gl.getUniformLocation( program, 'uLightDiffuse' );
    program.uLightAmbientLoc = gl.getUniformLocation( program, 'uLightAmbient' );

    program.uMaterialSpecularLoc = gl.getUniformLocation( program, 'uMaterialSpecular' );
    program.uMaterialDiffuseLoc = gl.getUniformLocation( program, 'uMaterialDiffuse' );
    program.uMaterialAmbientLoc = gl.getUniformLocation( program, 'uMaterialAmbient' );
    program.uShininessLoc = gl.getUniformLocation( program, 'uShininess' );

    // Set lighting uniforms
    gl.uniform3f( program.uLightDirectionLoc, 0.2, -0.2, 0.98 );
    gl.uniform4f( program.uLightSpecularLoc, 1, 1, 1, 1 );
    gl.uniform4f( program.uLightDiffuseLoc, 0.8, 1.0, 0.5, 1 );
    gl.uniform4f( program.uLightAmbientLoc, 0.5, 0.5, 0.5, 1 );

    gl.uniform4f( program.uMaterialSpecularLoc, 1, 1, 1, 1 );
    gl.uniform4f( program.uMaterialDiffuseLoc, 0.2, 0.7, 1, 1 );
    gl.uniform4f( program.uMaterialAmbientLoc, 0.5, 0.5, 0.5, 1 );
    gl.uniform1f( program.uShininessLoc, 2.5 );

    // Create square geometry (generally defined anti-clockwise)
    var vertices = new Float32Array([
        -1.0, -1.0, 0.0, // 2----3
         1.0, -1.0, 0.0, // | \  |
        -1.0,  1.0, 0.0, // |  \ |
         1.0,  1.0, 0.0  // 0----1
    ]);

    // Create a normal map. For our plane, each vertex normal is pointing
    // outwards along the positive z axis, towards the viewer
    var normals = new Float32Array([
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0
    ]);

    // Create a buffer to hold the geometry
    var vertexBuffer = gl.createBuffer();

    // Bind the buffer to the ARRAY_BUFFER bind point
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );

    // Fill the buffer with the vertex data
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

    // Enable this buffer as a per-vertex attribute array
    gl.enableVertexAttribArray( program.aVertexPositionLoc );

    // Tell WebGL how to interpret the data in this buffer:
    // 3 components or type FLOAT per attribute, non-interleaved and without offset
    gl.vertexAttribPointer( program.aVertexPositionLoc, 3, gl.FLOAT, false, 0, 0 );

    // Now do the same for the normals
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, normalBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW );
    gl.enableVertexAttribArray( program.aVertexNormalLoc );
    gl.vertexAttribPointer( program.aVertexNormalLoc, 3, gl.FLOAT, false, 0, 0 );

    // Create a transformation matrix
    var modelViewMatrix = mat4.create();

    // Create a perspective matrix
    var perspectiveMatrix = mat4.create();

    // Create a view frustrum with perspective from FOV, aspect ratio and near/far clipping planes
    mat4.perspective( perspectiveMatrix, 60 / 180 * Math.PI, canvas.width / canvas.height, 0.1, 100 );

    // Create a normal matrix for transforming vertex normals
    var normalMatrix = mat4.create();

    // Set some persistant states

    // Set clearColor state
    gl.clearColor( 0.5, 0.8, 0.8, 1.0 );

    // Set the viewport size to the renderable size of the canvas
    gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );

    function draw() {

        // Schedule next update
        requestAnimationFrame( draw );

        // Clear the color component of the screen buffer
        gl.clear( gl.COLOR_BUFFER_BIT );

        // Update the mesh transformation
        mat4.identity( modelViewMatrix );
        mat4.translate( modelViewMatrix, modelViewMatrix, [ 0, 0, -3 ] );
        //mat4.rotateX( modelViewMatrix, modelViewMatrix, Math.cos( +new Date() * 0.0002 ) * Math.PI * 1.8 );
        mat4.rotateY( modelViewMatrix, modelViewMatrix, Math.sin( +new Date() * 0.0005 ) * Math.PI * 1.3 );

        // Update the normal matrix, which is the inverted and transposed model-view matrix
        // @see http://www.lighthouse3d.com/tutorials/glsl-tutorial/the-normal-matrix/
        mat4.identity( normalMatrix );
        mat4.invert( normalMatrix, modelViewMatrix );
        mat4.transpose( normalMatrix, normalMatrix );

        // Update the modelViewMatrix uniform
        gl.uniformMatrix4fv( program.uPerspectiveMatrixLoc, false, perspectiveMatrix );
        gl.uniformMatrix4fv( program.uModelViewMatrixLoc, false, modelViewMatrix );
        gl.uniformMatrix4fv( program.uNormalMatrixLoc, false, normalMatrix );

        // Draw the currently bound geometry as a triangle strip
        // starting at the first value and drawing all 4 vertices
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
    }
}

DirectionalLight.prototype.phong = phong;

export { DirectionalLight };
