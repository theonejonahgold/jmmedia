import { EmailAddressResolver } from 'graphql-scalars'
import { Field, InputType } from 'type-graphql'

@InputType({ description: 'The Service Request Model' })
export class ServiceRequestInput {
  @Field(() => EmailAddressResolver)
  email: string

  @Field()
  subject: string

  @Field()
  service: string

  @Field()
  message: string
}
