import tensorflow as tf
import model as m
def classify(category,image_path):
    # Read in the image_data
    #print(image_path)
    print("==========================")
    print(category)
    image_path=image_path.replace('\\', '/')
    #print(image_path)
    image_data = tf.gfile.FastGFile(image_path, 'rb').read()
    if(category.upper() == "apple".upper()):
        output1=m.model_output(image_data,"C:/Users/Administrator/Desktop/KrishiSaarthi/transferlearnmodels/retrained_graph_agro_apple.pb","C:/Users/Administrator/Desktop/KrishiSaarthi/label/retrained_labels_apple.txt")
    if(category.upper() == "cotton".upper()):
        output1=m.model_output(image_data,"C:/Users/Administrator/Desktop/KrishiSaarthi/transferlearnmodels/retrained_graph_agro.pb","C:/Users/Administrator/Desktop/KrishiSaarthi/label/retrained_labels_cotton.txt")
    final_output=output1
    print(output1)
    return final_output
