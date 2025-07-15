import { TopicDto } from "../dto/topic.dto";

export class TopicMapper {
  static toTopicDto(topic: TopicDto): TopicDto {
    return { _id: topic._id, newId: topic.newId, name: topic.name, type: topic.type };
  }
}
