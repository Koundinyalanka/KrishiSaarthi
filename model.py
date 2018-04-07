import tensorflow as tf
import json
def model_output(image_data,model,labels):
    
    print(labels)
    label_lines = [line.rstrip() for line 
                       in tf.gfile.GFile(labels)]
    print(label_lines)
    print(model)
    
    with tf.gfile.FastGFile(model, 'rb') as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
        _ = tf.import_graph_def(graph_def, name='')
    
    with tf.Session() as sess:
        softmax_tensor = None
        predictions = None
        top_k = None
        softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
        
        predictions = sess.run(softmax_tensor, \
                 {'DecodeJpeg/contents:0': image_data})
        
        #Sort to show labels of first prediction in order of confidence
        top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]
        print(top_k)
##        output="{["
        output="["
        tableRowId =int(0)
        for node_id in top_k:
            human_string = label_lines[node_id]
            score = predictions[0][node_id]
            tableRowId += 1
            output=output+'{ "priority":'+'"'+str(tableRowId)+'", "label":'+'"'+label_lines[node_id] +'","probability":"'+ '{:.2f} %'.format(score*100)+'"}'
            print((len(label_lines)>tableRowId))
            if(len(label_lines)>tableRowId):
                output=output+","
            print('%s (score = %.5f)' % (human_string, score))
    tf.reset_default_graph()
##    print('{"list":'+output+"]}")
##    data=json.loads('{"list":'+output+"]}")
    data = json.loads(output+"]")
    print(data)
    return output+"]"
